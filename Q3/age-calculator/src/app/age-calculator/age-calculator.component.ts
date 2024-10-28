
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for Angular structural directives like *ngIf
import { FormsModule } from '@angular/forms';    // Import FormsModule for two-way data binding with ngModel

@Component({
  selector: 'app-age-calculator',  // Selector for the component
  standalone: true,  // Defines this as a standalone component (no need for a module)
  imports: [CommonModule, FormsModule],  // Import CommonModule and FormsModule for handling *ngIf, *ngFor, and ngModel
  templateUrl: './age-calculator.component.html',  // Path to the component's template file
  styleUrls: ['./age-calculator.component.css']    // Path to the component's styles file
})
export class AgeCalculatorComponent {

  // Property to hold the user's date of birth entered in the form (format: dd/mm/yyyy)
  dob!: string;

  // Property to store the calculated age (years, months, days, hours, minutes, seconds)
  age: any;

  /**
   * This method calculates the user's age based on the date of birth input.
   * It takes the `dob` string, splits it into day, month, and year components,
   * and calculates the difference between the current date and the date of birth.
   * The calculated age is then stored in the `age` property, which is displayed in the UI.
   */
  calculateAge() {
    if (!this.dob) {
        return;
    }

    // Split the date of birth and create a Date object
    const [day, month, year] = this.dob.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day); // JavaScript Date months are zero-indexed
    const currentDate = new Date();

    // Calculate the age in years, months, and days
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // Adjust if days are negative
    if (days < 0) {
        months--;
        // Get the last day of the previous month
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += lastMonth;
    }

    // Adjust if months are negative
    if (months < 0) {
        years--;
        months += 12;
    }

    // Now calculate the remaining hours, minutes, and seconds
    let hours = currentDate.getHours() - birthDate.getHours();  // Changed const to let
    let minutes = currentDate.getMinutes() - birthDate.getMinutes();  // Changed const to let
    let seconds = currentDate.getSeconds() - birthDate.getSeconds();  // Changed const to let

    // Adjust if hours are negative
    if (hours < 0) {
        hours += 24;
        minutes--; // If we borrowed an hour, we need to decrease minutes
    }

    // Adjust if minutes are negative
    if (minutes < 0) {
        minutes += 60;
        seconds--; // If we borrowed a minute, we need to decrease seconds
    }

    // Adjust if seconds are negative
    if (seconds < 0) {
        seconds += 60;
    }

    // Update the age object
    this.age = {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}
}

