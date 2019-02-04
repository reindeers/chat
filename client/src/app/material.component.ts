import {DateAdapter, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSliderModule, MatSnackBarModule, MatTabsModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {NgModule} from "@angular/core";
import {AppDateAdapter} from "./app.data.adapter";
import {CustomFormsModule} from "ng2-validation";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatOptionModule, MatListModule, MatListModule, MatSnackBarModule, MatProgressSpinnerModule, MatTabsModule, CustomFormsModule, MatToolbarModule, MatDialogModule, MatTooltipModule, FlexLayoutModule, MatIconModule, MatMenuModule, MatExpansionModule, MatProgressBarModule, MatPaginatorModule, MatSliderModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatOptionModule, MatListModule, MatListModule, MatSnackBarModule, MatProgressSpinnerModule, MatTabsModule, CustomFormsModule, MatToolbarModule, MatDialogModule, FlexLayoutModule, MatIconModule, MatMenuModule, MatExpansionModule, MatProgressBarModule, MatPaginatorModule, MatSliderModule],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter}
  ]
})

export class RiskMatrixMaterialComponentModule {


}
