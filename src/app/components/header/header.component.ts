import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { filter } from 'rxjs/operators';
import { JwtService } from '../../services/jwt.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentSection: string="";
  userCode : string = "";
  constructor(private router: Router,private toast : NgToastService,
    public jwtService : JwtService,private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserCode();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateBreadcrumb();
    });
  }

  getUserCode(): void {
    // Récupérer le jwtToken du localStorage
    const userData = localStorage.getItem('jwt');
    if (userData) {
      const parsedData = JSON.parse(userData);
      // Décoder le JWT en extrayant le payload (partie centrale du JWT)
      this.userCode = parsedData.user.userCode; // Accéder à userCode dans le payload
    }
  }
  logout() {
    this.jwtService.logout();
  }
  
  canSeeReferentiel(): boolean {
    return this.authService.hasRole('ROLE_admin') || this.authService.hasRole('ROLE_Juridiction');
  }

  canSeeSecurite(): boolean {
    return this.authService.hasRole('ROLE_admin');////this.authService.hasRole('ROLE_Juridiction') || 
  }
  canSeeScoring(): boolean {
    return this.authService.hasRole('ROLE_Charge Clientele') ||this.authService.hasRole('ROLE_ChargÃ© Clientele')
    ||this.authService.hasRole('ROLE_admin');
  }

  updateBreadcrumb(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('branch')) {
      this.currentSection = 'Gestion Agences Clients';
    } else if (currentUrl.includes('activitySector')) {
      this.currentSection = 'Gestion Secteurs d\'activités';
    }else if (currentUrl.includes('financingNature')) {
      this.currentSection = 'Gestion Nature de Financement';
    }else if (currentUrl.includes('financingType')) {
      this.currentSection = 'Gestion Type de Financement';
    }else if (currentUrl.includes('juridicalForm')) {
      this.currentSection = 'Gestion Forme Juridique';
    }else if (currentUrl.includes('currency')) {
      this.currentSection = 'Gestion Devises';
    } else if (currentUrl.includes('segmentsClients')) {
      this.currentSection = 'Gestion Segments Clients';
    } else if (currentUrl.includes('personnesPhysiques')) {
      this.currentSection = 'Gestion Personnes Physiques';
    } else if (currentUrl.includes('personnesMorales')) {
      this.currentSection = 'Gestion Personnes Morales';
    } else if (currentUrl.includes('segmentsClients')) {
      this.currentSection = 'Gestion Segments Clients';
    } else if (currentUrl.includes('notesClients')) {
      this.currentSection = 'Gestion Notes Clients';
    } else if (currentUrl.includes('users')) {
      this.currentSection = 'Gestion Utilisateurs';
    }else if (currentUrl.includes('groups')) {
      this.currentSection = 'Gestion Groupes';
    }else if (currentUrl.includes('organizationUnit')) {
      this.currentSection = 'Gestion Personnel de la banque';
    }else {
      this.currentSection = ''; // Ou une autre section par défaut
    }
  }
}
