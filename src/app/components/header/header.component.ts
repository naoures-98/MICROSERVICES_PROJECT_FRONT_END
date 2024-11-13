import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { filter } from 'rxjs/operators';
import { JwtService } from '../../services/jwt.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentSection: string="";

  constructor(private router: Router,private toast : NgToastService,
    public jwtService : JwtService,private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateBreadcrumb();
    });
  }


  logout() {
    this.jwtService.logout();
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
