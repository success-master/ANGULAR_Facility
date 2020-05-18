import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { appTags } from 'src/app/data/app-tags';
import { facilityAttributesPickList } from 'src/app/data/facility1-config';

import { DynamicComponent } from './dynamic/dynamic.component';
import { AddressComponent } from '../address/address.component';
import { ImagesComponent } from '../images/images.component';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(public dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver) {
    console.log("this is constructor");
  }

  // ADDRESS
  openAddressModal(): void {
    const dialogRef = this.dialog.open(AddressComponent, {
      width: '320px', maxWidth: '320px', disableClose: true
    });
  }

  // IMAGE
  openImageModal(): void {
    const dialogRef = this.dialog.open(ImagesComponent, {
      width: '320px', maxWidth: '320px', height: '568px', disableClose: true
    });
  }

  // SITE
  selected = '';
  siteChange(e) {
    // console.log(e.value);
  }

  // ATTRIBUTES
  attributeList: Array<{ key: string, label: string, controlType: string, type: string }> = facilityAttributesPickList;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  attChange(e) {
    console.log(e.value);
    let att = e.value;
    // create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    // add the component to the view
    const componentRef = this.container.createComponent(componentFactory);
    // pass some data to the component
    componentRef.instance.att = att;
  }
  selectedAtt = '';

  // TAGS
  toppingsControl = new FormControl([]);
  // toppingList: string[] = ['general arangements', 'protocol', 'critical', 'headquaters', 'supply chain', 'rfi', 'specific', 'operation', 'maintenance', 'fault finding',];
  toppingList: string[] = appTags;

  onToppingRemoved(topping: string) {
    const toppings = this.toppingsControl.value as string[];
    this.removeFirst(toppings, topping);
    this.toppingsControl.setValue(toppings); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
