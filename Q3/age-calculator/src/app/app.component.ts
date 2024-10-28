import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgeCalculatorComponent } from "./age-calculator/age-calculator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgeCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
