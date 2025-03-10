import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { initFlowbite } from 'flowbite'


@Component({
    selector: 'app-root',
    imports: [RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'front';

    constructor() {
        initFlowbite();
    }
}
