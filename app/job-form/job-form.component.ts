import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html'
})
export class JobFormComponent {

  selectedFile!: File;

  jobForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    location: ['', Validators.required],
    position: ['', Validators.required],
    experience: ['', Validators.required],
    education: ['', Validators.required],
    skills: [''],
    coverLetter: ['', Validators.required],
    relocate: [false]
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();

    Object.entries(this.jobForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/api/apply', formData)
      .subscribe({
        next: () => alert('Submitted successfully!'),
        error: () => alert('Error occurred')
      });
  }
}