import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit{

  thisCar: Car = new Car();
  id: string = ""

  constructor(private carService: CarService, private router: Router, private actRoute: ActivatedRoute, private cdRef: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    console.log('Car ID:', this.id);
    this.carService.getCar(this.id).subscribe(result => {
      this.thisCar = result;
      console.log('Fetched Car:', this.thisCar);
      this.cdRef.detectChanges(); 
    });
  }

  onSubmit() {
    this.carService.updateCar(this.id, this.thisCar).subscribe(edittedCar => {
      console.log('Updated Car:', edittedCar);
      window.alert("Car Edited Successfully");
      this.router.navigateByUrl("/car");
    });
  }
}




