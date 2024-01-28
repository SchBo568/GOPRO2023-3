
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RatingModule } from 'primeng/rating';
import { ReviewService } from '../../ApiServices/ReviewService';
import { CreateReview } from '../models/CreateReview';
import { SessionStorageService } from '../services/SessionStorageService';

@Component({
  selector: 'app-modal-create-review',
  standalone: true,
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule, RatingModule],
  templateUrl: './modal-create-review.component.html',
  styleUrl: './modal-create-review.component.scss',
  providers: [ReviewService]
})
export class ModalCreateReviewComponent {
  review: CreateReview = {
    toolId: 1,
    comment: "",
    stars: 1,
    reviewingUser: "",
    timestamp: new Date()
  }
  value: number = 0;
  reviewComment: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalCreateReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {toolId: number}, 
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private sessionUser: SessionStorageService
  ) { }

  ngOnInit(): void {
    
  }

  onRate(event: any): void {
        this.value = event.value;
  }

  submitReview(): void {
            
    this.review.reviewingUser = this.sessionUser.getUser()?.PK_username!
    this.review.comment = this.reviewComment
    this.review.stars = this.value
    this.review.timestamp = new Date()
    this.review.toolId = this.data.toolId;

    this.reviewService.createReview(this.review).subscribe((response: any) => {
      this.dialogRef.close()
    })
      }


}

