import { Component, computed, inject, input, Input, signal } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  // @Input({ required: true })
  // set id(childId: number) {
  //   this.childId = childId
  //   console.log('childId---------', childId)
  // }
  // get id(): number {
  //   return this.childId;
  // }
  // private childId = 0;

  id = input.required<number>();
  toggle = signal(false);
  // Create a computed expression that reads the value input
  label = computed(() => `The child id is ${this.id()}`);

  private formBuilder = inject(FormBuilder);

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')]),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  updateProfile() {
    const value = {
      firstName: 'Nancy22',
      address: {
        street: '123 Drew Street',
      },
      curent: '343'
    }
    this.profileForm.patchValue(value);
  }

  toggleDisplay() {
    this.toggle.update((toggle) => !toggle);
  }

  toggleAriaLabel = computed(() => {
    return this.toggle()
      ? $localize`:Toggle Button|A button to toggle status:Show`
      : $localize`:Toggle Button|A button to toggle status:Hide`;
  });

}

