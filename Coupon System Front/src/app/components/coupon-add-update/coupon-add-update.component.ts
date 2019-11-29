import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';
import { Coupon } from 'src/app/models/coupon';
import { CouponType } from 'src/app/models/CouponType';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-coupon-add-update',
  templateUrl: './coupon-add-update.component.html',
  styleUrls: ['./coupon-add-update.component.css']
})
export class CouponAddUpdateComponent implements OnInit {

  public coupon: Coupon;
  constructor(
    private activatedRoute: ActivatedRoute,
    private couponService: CouponService,
    private companyService: CompanyService,
    private router: Router
  ) { }
  public add: boolean;
  private id: number;
  private url: string;
  public couponTypes: CouponType[] = [CouponType.AUTOMOBILE, CouponType.CAMPING, CouponType.COMPUTER,
  CouponType.ELECTRICITY];
  ngOnInit() {
    this.url = '/coupons/company';
    this.id = this.activatedRoute.snapshot.params.id;
    // tslint:disable-next-line:triple-equals
    this.add = this.id == 0;
    if (!this.add) {
      this.couponService.getSingleCoupon(this.id).subscribe((coupon) => this.coupon = coupon);
    } else {
      this.coupon = new Coupon(this.id , 0 , '' , '' , CouponType.FOOD , 0 , null , null , '' ) ;
    }
  }
  public submitChanges() {
    if (this.add) {
      this.companyService.addCoupon(this.coupon).subscribe( () => {this.router.navigateByUrl(this.url); } );
    } else {
      this.companyService.updateCoupon(this.coupon).subscribe(() => {this.router.navigateByUrl(this.url); } );
    }
  }

}
