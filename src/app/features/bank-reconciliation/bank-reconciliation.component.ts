import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank-reconciliation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .br-wrap { display:flex; flex-direction:column; gap:14px; padding:16px 20px; height:100%; background:#F9FAFB; }
    .filter-row { background:white; border:1px solid #E5E7EB; border-radius:8px; padding:12px 14px; display:flex; align-items:flex-end; gap:10px; flex-wrap:wrap; flex-shrink:0; }
    .fl { display:flex; flex-direction:column; gap:3px; }
    .fl label { font-size:10px; color:#6B7280; font-weight:500; }
    .date-box { display:flex; align-items:center; gap:6px; border:1px solid #D1D5DB; border-radius:6px; padding:0 10px; height:36px; background:white; font-size:12px; color:#374151; cursor:pointer; white-space:nowrap; }
    .search-box { position:relative; flex:1; min-width:180px; }
    .search-box input { padding-left:30px; }
    .search-icon { position:absolute; left:8px; top:50%; transform:translateY(-50%); width:15px; height:15px; }
    .export-row { display:flex; gap:10px; flex-shrink:0; }
    .table-card { background:white; border:1px solid #E5E7EB; border-radius:8px; flex:1; display:flex; flex-direction:column; overflow:hidden; }
    .tbl { width:100%; border-collapse:collapse; font-size:13px; }
    .tbl th { text-align:left; padding:12px 20px; color:#374151; font-weight:600; border-bottom:1px solid #E5E7EB; white-space:nowrap; background:white; position:sticky; top:0; }
    .tbl td { padding:13px 20px; border-bottom:1px solid #F3F4F6; color:#374151; }
    .tbl tr:hover td { background:#F9FAFB; }
    .pager { padding:12px 20px; border-top:1px solid #E5E7EB; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
    .page-btns { display:flex; gap:4px; }
    .pbtn { width:28px; height:28px; border:1px solid #E5E7EB; border-radius:5px; background:white; cursor:pointer; font-size:11px; color:#6B7280; display:flex; align-items:center; justify-content:center; font-family:inherit; }
    .pbtn.act { background:#1A56DB; color:white; border-color:#1A56DB; font-weight:700; }
    .pbtn:disabled { opacity:.4; cursor:default; }
  `],
  template: `
    <div class="page-content">
      <div class="br-wrap">
        <h1 style="font-size:18px;font-weight:800;color:#111827;letter-spacing:.04em;text-transform:uppercase;margin:0;flex-shrink:0;">Bank Reconciliation</h1>

        <!-- Filter Bar -->
        <div class="filter-row">
          <div class="search-box">
            <svg class="search-icon" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input class="form-input" placeholder="Search by TXN, entry VRN" [(ngModel)]="search">
          </div>
          <div class="fl">
            <label>From Date</label>
            <div class="date-box"><svg style="width:14px;height:14px;" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>18 May 2025</div>
          </div>
          <div class="fl">
            <label>To Date</label>
            <div class="date-box"><svg style="width:14px;height:14px;" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>18 May 2025</div>
          </div>
          <div class="fl" style="min-width:150px;">
            <label>Shift</label>
            <select class="form-input" [(ngModel)]="shift"><option>All Shifts</option><option>Morning (6AM-2PM)</option><option>Evening (2PM-10PM)</option></select>
          </div>
          <div class="fl" style="min-width:140px;">
            <label>Lane</label>
            <select class="form-input" [(ngModel)]="lane"><option>All Lanes</option>@for(l of lanes;track l){<option>{{l}}</option>}</select>
          </div>
          <button class="btn-primary" style="padding:0 18px;height:36px;margin-top:13px;">
            <svg style="width:14px;height:14px;" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            Generate
          </button>
        </div>

        <!-- Export -->
        <div class="export-row">
          <button class="btn-outlined-green">
            <svg style="width:14px;height:14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Export to Excel
          </button>
          <button class="btn-outlined-red">
            <svg style="width:14px;height:14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            Export to PDF
          </button>
        </div>

        <!-- Table -->
        <div class="table-card">
          <div style="flex:1;overflow:auto;">
            <table class="tbl">
              <thead>
                <tr><th>S.No.</th><th>Lane No.</th><th>VRN</th><th>Tag ID</th><th>Vehicle Class</th></tr>
              </thead>
              <tbody>
                @for (r of rows; track r.s) {
                  <tr>
                    <td style="color:#6B7280;">{{r.s}}</td>
                    <td>{{r.lane}}</td>
                    <td style="font-weight:600;color:#111827;">{{r.vrn}}</td>
                    <td style="font-family:monospace;font-size:11px;color:#6B7280;">{{r.tag}}</td>
                    <td>{{r.vc}}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div class="pager">
            <span style="font-size:11px;color:#6B7280;">Showing 1 to 10 of 245 entries</span>
            <div class="page-btns">
              <button class="pbtn" [disabled]="page===1" (click)="page=page-1">‹</button>
              @for (p of pages; track p) {
                @if (p===-1) { <span style="padding:0 4px;color:#9CA3AF;font-size:11px;line-height:28px;">...</span> }
                @else { <button class="pbtn" [class.act]="p===page" (click)="page=p">{{p}}</button> }
              }
              <button class="pbtn" [disabled]="page===25" (click)="page=page+1">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BankReconciliationComponent {
  search=''; shift='All Shifts'; lane='All Lanes'; page=1;
  lanes=['Lane 01','Lane 02','Lane 03','Lane 04','Lane 05','Lane 06'];
  rows=[
    {s:1,lane:'Lane 01',vrn:'HR26DK8337',tag:'E280117020000F5A3',vc:'Car / Jeep / Van'},
    {s:2,lane:'Lane 02',vrn:'DL12AB1234',tag:'E280117020000F5A4',vc:'LCV'},
    {s:3,lane:'Lane 03',vrn:'UP16EF1122',tag:'E280117020000F5A5',vc:'Bus / Truck'},
    {s:4,lane:'Lane 04',vrn:'RJ14GH3344',tag:'E280117020000F5A6',vc:'Bus / Truck'},
    {s:5,lane:'Lane 05',vrn:'PB10IJ5566',tag:'E280117020000F5A7',vc:'Car / Jeep / Van'},
    {s:6,lane:'Lane 06',vrn:'KA03KL7788',tag:'E280117020000F5A8',vc:'LCV'},
    {s:7,lane:'Lane 01',vrn:'MH12MN9900',tag:'E280117020000F5A9',vc:'Bus / Truck'},
    {s:8,lane:'Lane 02',vrn:'GJ05OP1123',tag:'E280117020000F5AA',vc:'Car / Jeep / Van'},
    {s:9,lane:'Lane 03',vrn:'TN22QR3344',tag:'E280117020000F5AB',vc:'LCV'},
    {s:10,lane:'Lane 04',vrn:'WB20TY5566',tag:'E280117020000F5AC',vc:'Bus / Truck'},
  ];
  get pages(){
    const p:number[]=[];
    p.push(1);
    if(this.page>3)p.push(-1);
    for(let i=Math.max(2,this.page-1);i<=Math.min(24,this.page+1);i++)p.push(i);
    if(this.page<23)p.push(-1);
    p.push(25);
    return p;
  }
}
