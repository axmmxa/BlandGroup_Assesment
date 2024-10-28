import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import Angular testing utilities
import { FormsModule } from '@angular/forms'; // Import FormsModule for testing ngModel
import { AgeCalculatorComponent } from './age-calculator.component'; // Import the component to be tested

// Describe the test suite for AgeCalculatorComponent
describe('AgeCalculatorComponent', () => {
  let component: AgeCalculatorComponent; // Declare a variable for the component
  let fixture: ComponentFixture<AgeCalculatorComponent>; // Declare a variable for the component fixture

  // Set up the testing module before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AgeCalculatorComponent], // Import FormsModule and the AgeCalculatorComponent directly
    }).compileComponents(); // Compile the components in the test module
  });

  // Create the component instance and initialize the fixture before each test
  beforeEach(() => {
    fixture = TestBed.createComponent(AgeCalculatorComponent); // Create the component fixture
    component = fixture.componentInstance; // Get the instance of the component
    fixture.detectChanges(); // Trigger change detection for the component
  });

  /**
   * Test to check if the component is created successfully.
   */
  it('should create the component', () => {
    expect(component).toBeTruthy(); // Assert that the component instance is truthy
  });

  /**
   * Test the age calculation when a valid date of birth is provided.
   */
  it('should calculate age correctly for a valid date of birth', () => {
    component.dob = '01/01/2000'; // Set a valid date of birth
    component.calculateAge(); // Call the method to calculate age

    // Expect the calculated age to be correct based on the current date
    expect(component.age.years).toBeGreaterThanOrEqual(23); // Assuming the current year is 2024
    expect(component.age.months).toBeLessThan(12); // Ensure months are less than 12
    expect(component.age.days).toBeGreaterThanOrEqual(0); // Ensure days are non-negative
  });

  /**
   * Test the age calculation when the date of birth is not provided.
   */
  it('should not calculate age if date of birth is not provided', () => {
    component.dob = ''; // Set the date of birth to an empty string
    component.calculateAge(); // Call the method to calculate age

    expect(component.age).toBeUndefined(); // Expect the age to be undefined
  });

  /**
   * Test the age calculation when an invalid date format is provided.
   */
  it('should not throw an error for invalid date format', () => {
    component.dob = 'invalid date'; // Set an invalid date format
    expect(() => component.calculateAge()).not.toThrow(); // Expect no error to be thrown
  });

  /**
   * Test the age calculation with a leap year birthdate.
   */
  it('should calculate age correctly for leap year birthdate', () => {
    component.dob = '29/02/2000'; // Set a leap year date of birth
    component.calculateAge(); // Call the method to calculate age

    // Expect the age to be calculated correctly based on today's date
    expect(component.age.years).toBeGreaterThanOrEqual(23); // Assuming the current year is 2024
    expect(component.age.months).toBeLessThan(12); // Ensure months are less than 12
    expect(component.age.days).toBeGreaterThanOrEqual(0); // Ensure days are non-negative
  });
});
