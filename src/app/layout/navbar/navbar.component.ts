import { Component } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private flowbiteService: FlowbiteService,
    private auth: AuthServiceService
  ) {}
  isLoggedIn = false;
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.auth.isLoggedIn.subscribe({
      next: (value) => {
        this.isLoggedIn = value;
      },
    });
  }
  logOut() {
    this.auth.logOut();
  }
}
