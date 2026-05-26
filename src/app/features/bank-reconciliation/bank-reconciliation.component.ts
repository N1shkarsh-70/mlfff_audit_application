import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank-reconciliation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col bg-[#F9FAFB] p-4 md:p-6 lg:p-8 gap-4 md:gap-6 w-full min-h-0 overflow-y-auto lg:overflow-hidden lg:h-full">
      
      <!-- HEADER -->
      <div class="shrink-0">
        <h1 class="text-[#111827] text-lg font-extrabold uppercase tracking-wide leading-none">Bank Reconciliation</h1>
      </div>

      <!-- FILTER CONTAINER -->
      <div class="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col xl:flex-row items-start xl:items-end gap-5 shrink-0 w-full">
        <!-- Search -->
        <div class="flex-1 w-full xl:w-auto relative min-w-[240px]">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" class="w-full bg-white border border-gray-200 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 hover:border-gray-300 placeholder-gray-400 transition-colors" placeholder="Search by TXN, entry VRN" [(ngModel)]="search">
        </div>

        <!-- From Date -->
        <div class="flex flex-col gap-1.5 w-full xl:w-[180px] shrink-0">
          <label class="text-[12px] font-bold text-gray-800">From Date</label>
          <div class="relative flex items-center">
            <svg class="absolute left-3.5 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <input type="date" class="w-full bg-white border border-gray-200 text-sm font-semibold text-gray-800 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none hover:border-gray-300 transition-colors cursor-pointer" [(ngModel)]="fromDate">
          </div>
        </div>

        <!-- To Date -->
        <div class="flex flex-col gap-1.5 w-full xl:w-[180px] shrink-0">
          <label class="text-[12px] font-bold text-gray-800">To Date</label>
          <div class="relative flex items-center">
            <svg class="absolute left-3.5 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <input type="date" class="w-full bg-white border border-gray-200 text-sm font-semibold text-gray-800 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none hover:border-gray-300 transition-colors cursor-pointer" [(ngModel)]="toDate">
          </div>
        </div>

        <!-- Shift -->
        <div class="flex flex-col gap-1.5 w-full xl:w-[160px] shrink-0">
          <label class="text-[12px] font-bold text-gray-800">Shift</label>
          <div class="relative">
            <select class="appearance-none w-full bg-white border border-gray-200 text-sm font-semibold text-gray-800 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none hover:border-gray-300 cursor-pointer transition-colors" [(ngModel)]="shift">
              <option>All Shifts</option>
              <option>Morning</option>
              <option>Evening</option>
            </select>
            <svg class="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>

        <!-- Lane -->
        <div class="flex flex-col gap-1.5 w-full xl:w-[160px] shrink-0">
          <label class="text-[12px] font-bold text-gray-800">Lane</label>
          <div class="relative">
            <select class="appearance-none w-full bg-white border border-gray-200 text-sm font-semibold text-gray-800 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none hover:border-gray-300 cursor-pointer transition-colors" [(ngModel)]="lane">
              <option>All Lanes</option>
              <option *ngFor="let l of lanes">{{l}}</option>
            </select>
            <svg class="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>

        <!-- Generate Button -->
        <button class="bg-[#1A56DB] hover:bg-blue-700 text-white text-sm font-bold rounded-lg px-6 py-2.5 flex items-center justify-center gap-2 transition-colors shrink-0 w-full xl:w-auto h-[42px]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          Generate
        </button>
      </div>

      <!-- EXPORT BUTTONS -->
      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <button class="bg-white border border-[#22C55E] text-[#16A34A] hover:bg-green-50 text-[13px] font-bold rounded-md px-4 py-2.5 flex items-center gap-2 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Export to Excel
        </button>
        <button class="bg-white border border-[#EF4444] text-[#DC2626] hover:bg-red-50 text-[13px] font-bold rounded-md px-4 py-2.5 flex items-center gap-2 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          Export to PDF
        </button>
      </div>

      <!-- TABLE CONTAINER -->
      <div class="bg-white border border-gray-100 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col flex-1 min-h-0 overflow-hidden w-full">
        <div class="flex-1 overflow-auto">
          <table class="w-full text-left text-[13px] whitespace-nowrap">
            <thead class="sticky top-0 bg-white z-10 border-b border-gray-100 shadow-sm">
              <tr>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">S.No.</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">Lane No.</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">VRN</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">Tag ID</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">Vehicle Class</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 font-medium">
              @for (r of rows; track r.s) {
                <tr class="hover:bg-gray-50 border-b border-gray-50 transition-colors">
                  <td class="px-6 py-4 text-gray-900 font-bold">{{r.s}}</td>
                  <td class="px-6 py-4">{{r.lane}}</td>
                  <td class="px-6 py-4 text-gray-900 font-bold">{{r.vrn}}</td>
                  <td class="px-6 py-4 text-[#6B7280] font-mono text-[12px]">{{r.tag}}</td>
                  <td class="px-6 py-4">{{r.vc}}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        
        <!-- PAGINATION -->
        <div class="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white shrink-0">
          <span class="text-[13px] font-semibold text-gray-500">Showing 1 to 10 of 245 entries</span>
          <div class="flex items-center gap-1.5">
            <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors" [disabled]="page===1" (click)="page=page-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            @for (p of pages; track p) {
              @if (p === -1) { 
                <span class="px-1 text-gray-400 font-bold text-[13px]">...</span> 
              }
              @else { 
                <button class="w-8 h-8 flex items-center justify-center rounded border text-[13px] font-bold transition-colors" 
                        [class.bg-[#EFF6FF]]="p===page" [class.border-[#BFDBFE]]="p===page" [class.text-[#1A56DB]]="p===page"
                        [class.bg-white]="p!==page" [class.border-gray-200]="p!==page" [class.text-gray-600]="p!==page" [class.hover:bg-gray-50]="p!==page"
                        (click)="page=p">{{p}}</button> 
              }
            }
            <button class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors" [disabled]="page===25" (click)="page=page+1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  `
})
export class BankReconciliationComponent {
  search=''; shift='All Shifts'; lane='All Lanes'; page=1;
  fromDate='2025-05-18'; toDate='2025-05-18';
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
