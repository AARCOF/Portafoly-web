import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserRequest, UserService } from '../../services/userService';
import { SkillService, SkillDTO } from '../../services/skill-service';
import { LanguageDTO, LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user: any = null;
  newSkill: string = '';
  newLanguage: string = '';
  showConfirmationWarning: boolean = false;
  showSkillModal: boolean = false;
  showLanguageModal: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private skillService: SkillService,
    private languageService: LanguageService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const passedUser = this.userService.getLoggedUser();

    if (!passedUser) {
      this.router.navigate(['/login']);
    } else {
      this.loadUserFromBackend(passedUser.id);
    }
  }

  loadUserFromBackend(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (fullUser) => {
        this.user = fullUser;
        if (!this.user.skills) this.user.skills = [];
        if (!this.user.languages) this.user.languages = [];

        // Opcional: cargar de manera independiente si los quieres
        this.loadSkills();
        this.loadLanguages();

        this.checkConfirmation();
      },
      error: () => {
        alert('Error al cargar usuario');
        this.router.navigate(['/']);
      },
    });
  }

  loadSkills() {
    this.skillService.getSkills(this.user.id).subscribe({
      next: (skills: SkillDTO[]) => {
        this.user.skills = skills; // mantener objetos completos
      },
      error: () => console.error('Error cargando skills'),
    });
  }

  loadLanguages() {
    this.languageService.getLanguagesByUser(this.user.id).subscribe({
      next: (langs: LanguageDTO[]) => {
        this.user.languages = langs; // mantener objetos completos
      },
      error: () => console.error('Error cargando languages'),
    });
  }

  checkConfirmation() {
    this.showConfirmationWarning = !this.user.enabled;
  }

  updateProfile() {
    const userDTO = {
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      profession: this.user.profession,
      birthDate: this.user.birthDate, // asegúrate que sea 'YYYY-MM-DD'
      enabled: this.user.enabled,
      skills: this.user.skills.map((s: any) => ({
        id: s.id ?? null,
        name: s.name,
        level: s.level ?? 0,
      })),
      languages: this.user.languages.map(
        (l: any) => (typeof l === 'string' ? l : l.name) // por si lo tienes como objeto
      ),
    };

    this.userService.updateUser(this.user.id, userDTO).subscribe({
      next: () => console.log('Perfil actualizado correctamente'),
      error: (err) => {
        console.error('Error al actualizar perfil', err);
        alert('Error al actualizar el perfil');
      },
    });
  }

  addSkill() {
    const skillName = this.newSkill.trim();
    if (
      skillName &&
      !this.user.skills.some((s: SkillDTO) => s.name === skillName)
    ) {
      this.skillService.addSkill(this.user.id, { name: skillName }).subscribe({
        next: (savedSkill: SkillDTO) => {
          this.user.skills.push(savedSkill); // mantiene objeto completo
          this.newSkill = '';
          this.showSkillModal = false;
        },
        error: (err) => {
          console.error('Error al agregar la skill', err);
          alert(
            'Error al agregar la skill. Revisa que el nombre no esté vacío y que el backend esté corriendo.'
          );
        },
      });
    }
  }

  addLanguage() {
    const languageName = this.newLanguage.trim();
    if (
      languageName &&
      !this.user.languages.some((l: LanguageDTO) => l.name === languageName)
    ) {
      this.languageService
        .addLanguage(this.user.id, { name: languageName })
        .subscribe({
          next: (savedLang: LanguageDTO) => {
            this.user.languages.push(savedLang);
            this.newLanguage = '';
            this.showLanguageModal = false;
          },
          error: () => alert('Error al agregar el language'),
        });
    }
  }

  removeSkill(index: number) {
    const skill = this.user.skills[index];
    this.skillService.deleteSkill(skill.id).subscribe({
      next: () => this.user.skills.splice(index, 1), // eliminar correctamente
      error: () => alert('Error al eliminar la skill'),
    });
  }

  removeLanguage(index: number) {
    const lang = this.user.languages[index];
    this.languageService.deleteLanguage(lang.id).subscribe({
      next: () => this.user.languages.splice(index, 1),
      error: () => alert('Error al eliminar el language'),
    });
  }
}
