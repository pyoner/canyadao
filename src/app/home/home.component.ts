import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import { WalletService } from '../wallet.service';
import { Tier } from '../dataTier';
import { Member } from '../dataMember';
import { DaoService } from '../dao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  dataDAO: Tier[];
  memberDAO: Member;
  perks0 = []; perks1 = []; perks2 = [];  perks3 = [];

  canAmount = 20000000;
  canPrice = 0.02;
  canAddress = '0x1d462414fe14cf489c7A21CaC78509f4bF8CD7c0';
  daoAddress = '0x685678927216DF235A4A5A952EfE88ed55e62Ff2';
  apiKey = 'J5NSX2YJY1U6U5T8WBFDKKQWWYEPI2P735';

  // Flags
  loading = true;

  closeResult: string;

  //No Wallet Alert
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  constructor(private router: Router,
    private activatedRoute:  ActivatedRoute,
    private modalService: NgbModal,
    private walletService: WalletService,
    private daoService: DaoService) {}


    ngOnInit() {

      // Init DB Model
      // this.daoService.loadDAO();

      setTimeout( () => {
        this.loading = false;
        this.checkWallet();
      }, 2000
    );
    $('#top-nav .nav-item a').css('color','#919d9d');

    setTimeout( () => {
      this.checkWallet();
    }, 5000
  );

    this.canPrice = this.getCANPrice();
    this.canAmount = this.getCANAmountLive();
    this.perks0 = this.getPerks(0);
    this.perks1 = this.getPerks(1);
    this.perks2 = this.getPerks(2);
    this.perks3 = this.getPerks(3);

    // this.dataDAO = this.daoService.getDataDAO();
    // this.memberDAO = this.daoService.getMemberDAO();

    // Alert Timer
    setTimeout(() => this.staticAlertClosed = true, 10000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

  }
  ngAfterViewInit(){

  }

  getWallet(): string{
    return this.walletService.getWallet();
  }

  getWalletBool(): boolean{
    return this.walletService.walletBool;
  }

  getWalletNone(): boolean{
    return this.walletService.walletNone;
  }



  getStake(id): number {
    return this.daoService.getStake(id);
  }

  getName(id): string {
    return this.daoService.getName(id);
  }

  getPeriod(id): number {
    return this.daoService.getPeriod(id);
  }

  getPerks(id): string[] {
    return this.daoService.getPerks(id);
  }

  getMemberWallet(): string {
    return this.daoService.getMemberWallet();
  }
  getMemberName(): string {
    return this.daoService.getMemberName();
  }

  getMemberTier(): number {
    return this.daoService.getMemberTier();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public navigate(url){
    this.router.navigate([url])
  }


  public checkWallet() {
    if (this.walletService.walletNone) {
      this._success.next(`Please Connect Your Wallet`);
    }

}

  /** JSON Parser */
  getJSON(url) {
    let resp;
    let xmlHttp;
    resp = '';
    xmlHttp = new XMLHttpRequest();
    if (xmlHttp != null) {
      xmlHttp.open('GET', url, false);
      xmlHttp.send(null);
      resp = xmlHttp.responseText;
    }
    return JSON.parse(resp);
  }

  getCANUSD(){
    return this.canPrice * this.canAmount;
  }

  convertToLocaleString(variable) {
    const withCommas = parseFloat(variable).toFixed(2);
    return withCommas.replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  getCANPrice() {
    const cmcApi = 'https://api.coinmarketcap.com/v1/ticker/canyacoin/';
    const result = (this.getJSON(cmcApi));
    const result2 = result[0].price_usd;
    return result2;
  }

  getCANAmountLive() {
    const result =  this.getTokenBalanceAtAddress(this.daoAddress, this.canAddress, 6);
    return result;
  }

  getTokenBalanceAtAddress(targetAddress, tokenAddress, precision) {
    const etherscanApi = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='; // the API link.
    const etherscanApiToken = etherscanApi + tokenAddress; // change this value if you want to use other token.
    const tokensAtAddress = etherscanApiToken + '&address=' + targetAddress + '&tag=latest';
    const tokensAPIKey = tokensAtAddress + '&apikey=' + this.apiKey;
    const result = Math.floor(this.getJSON(tokensAtAddress).result / (Math.pow(10, precision)));
    return result;
  }

  // https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=YourApiKeyToken

}
