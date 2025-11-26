import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Mon Profil</h1>
    <p>Cette page affichera bientôt les informations de l'utilisateur.</p> `,
})
export class ProfileComponent {}