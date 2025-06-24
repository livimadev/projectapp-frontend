import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { LoginService } from '../../services/login.service';
import { Menu } from '../../model/menu';

@Component({
  selector: 'app-layout',
  imports: [
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})

export class LayoutComponent {
  menus: Menu[];

  constructor(
    private menuService: MenuService,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.menuService.getMenuChange().subscribe(data => this.menus = data);
  }

  logout(){
    this.loginService.logout();
  }
}
