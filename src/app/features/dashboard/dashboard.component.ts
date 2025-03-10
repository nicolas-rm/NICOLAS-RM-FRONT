import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';

// declare function init_plugins(): void;

@Component({
    selector: 'app-dashboard',
    imports: [NavbarComponent, SidebarComponent, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {
        // init_plugins();
    }

}
