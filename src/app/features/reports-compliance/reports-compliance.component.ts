import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports-compliance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col bg-[#F9FAFB] p-4 md:p-6 lg:p-8 gap-4 md:gap-6 w-full min-h-0 overflow-y-auto lg:overflow-hidden lg:h-full">
      
      <!-- TOP ROW: HEADER & FILTERS -->
      <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-6 shrink-0">
        <!-- Header -->
        <div class="flex flex-col gap-1.5 shrink-0">
          <h1 class="text-[#111827] text-lg font-extrabold uppercase tracking-wide leading-none">Reports & Compliance</h1>
          <p class="text-[13px] text-gray-500 font-medium">Access and generate audit and compliance reports</p>
        </div>

        <!-- Filters -->
        <div class="flex flex-col md:flex-row items-end gap-4 w-full xl:w-auto">
          <!-- From Date -->
          <div class="flex flex-col gap-1.5 w-full md:w-[160px] shrink-0">
            <label class="text-[12px] font-bold text-gray-800">From Date</label>
            <div class="relative flex items-center">
              <svg class="absolute left-3.5 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <input type="date" class="w-full bg-white border border-gray-200 text-sm font-semibold text-gray-800 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none hover:border-gray-300 transition-colors cursor-pointer" [(ngModel)]="fromDate">
            </div>
          </div>

          <!-- To Date -->
          <div class="flex flex-col gap-1.5 w-full md:w-[160px] shrink-0">
            <label class="text-[12px] font-bold text-gray-800">To Date</label>
            <div class="relative flex items-center">
              <svg class="absolute left-3.5 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <input type="date" class="w-full bg-white border border-gray-200 text-sm font-semibold text-gray-800 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none hover:border-gray-300 transition-colors cursor-pointer" [(ngModel)]="toDate">
            </div>
          </div>

          <!-- Shift -->
          <div class="flex flex-col gap-1.5 w-full md:w-[150px] shrink-0">
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
          <div class="flex flex-col gap-1.5 w-full md:w-[150px] shrink-0">
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
          <button class="bg-[#1A56DB] hover:bg-blue-700 text-white text-sm font-bold rounded-lg px-6 py-2.5 flex items-center justify-center gap-2 transition-colors shrink-0 w-full md:w-auto h-[42px]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            Generate
          </button>
        </div>
      </div>

      <!-- CARDS ROW -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 shrink-0">
        @for (c of reportCards; track c.title) {
          <div class="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col gap-5 transition-shadow hover:shadow-md">
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" [style.background]="c.iconBg">
                <span [innerHTML]="c.icon" class="flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6"></span>
              </div>
              
              <!-- Text content -->
              <div class="flex-1 min-w-0 flex flex-col">
                <h3 class="text-[13px] font-extrabold text-gray-900 leading-snug">{{c.title}}</h3>
                <p class="text-[11px] font-medium text-gray-500 mt-1.5 leading-relaxed">{{c.desc}}</p>
              </div>

              <!-- Number -->
              <div class="flex flex-col items-center shrink-0 ml-2">
                <span class="text-2xl font-black text-[#111827] leading-none">{{c.count}}</span>
                <span class="text-[10px] font-semibold text-gray-500 mt-1">Report</span>
              </div>
            </div>

            <!-- Generate Button -->
            <button class="w-full rounded-lg border-[1.5px] py-2 text-[13px] font-extrabold transition-colors bg-white"
                    [style.borderColor]="c.color" 
                    [style.color]="c.color"
                    (mouseover)="hoveredCard = c.title"
                    (mouseout)="hoveredCard = ''"
                    [style.backgroundColor]="hoveredCard === c.title ? c.iconBg : 'white'"
                    (click)="c.count = c.count + 1">
              Generate Report
            </button>
          </div>
        }
      </div>

      <!-- TABLE CONTAINER -->
      <div class="bg-white border border-gray-100 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col flex-1 min-h-0 overflow-hidden w-full">
        <!-- Table Header & Export Button -->
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <div class="flex items-center gap-2.5">
            <svg class="w-5 h-5 text-[#1A56DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <h2 class="text-[15px] font-extrabold text-gray-900">Generated Reports</h2>
          </div>
          <button class="bg-[#1A56DB] hover:bg-blue-700 text-white text-[13px] font-bold rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export All Reports
          </button>
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-auto">
          <table class="w-full text-left text-[12px] whitespace-nowrap">
            <thead class="sticky top-0 bg-white z-10 border-b border-gray-100 shadow-sm">
              <tr>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">Report Name</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">Report Type</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">From Date</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">To Date</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">Shift</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">Lane</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">Generated On</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide">Generated By</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide text-center">Format</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide text-center">Status</th>
                <th class="px-6 py-4 font-extrabold text-gray-900 tracking-wide text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 font-medium">
              @for (r of reports; track r.id) {
                <tr class="hover:bg-gray-50 border-b border-gray-50 transition-colors">
                  <td class="px-6 py-4 text-[#111827] font-bold">{{r.name}}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <span [innerHTML]="r.typeIcon" class="flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4"></span>
                      <span class="text-gray-800 font-bold">{{r.type}}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{r.from}}</td>
                  <td class="px-6 py-4">{{r.to}}</td>
                  <td class="px-6 py-4">{{r.shift}}</td>
                  <td class="px-6 py-4">{{r.lane}}</td>
                  <td class="px-6 py-4 text-gray-500">{{r.on}}</td>
                  <td class="px-6 py-4">{{r.by}}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center justify-center gap-1.5" [class.text-[#DC2626]]="r.fmt==='PDF'" [class.text-[#16A34A]]="r.fmt==='Excel'">
                      <svg *ngIf="r.fmt==='PDF'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                      <svg *ngIf="r.fmt==='Excel'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                      <span class="font-extrabold">{{r.fmt}}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="inline-flex items-center justify-center px-3 py-1.5 text-[11px] font-extrabold rounded-md bg-[#DCFCE7] text-[#16A34A]">
                      {{r.status}}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                      <button class="p-1.5 text-gray-500 hover:text-[#1A56DB] hover:bg-blue-50 rounded-md transition-colors" title="Download">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      </button>
                      <button class="p-1.5 text-gray-500 hover:text-[#DC2626] hover:bg-red-50 rounded-md transition-colors" title="Delete" (click)="del(r.id)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `
})
export class ReportsComplianceComponent {
  shift='All Shifts'; lane='All Lanes';
  fromDate='2025-05-18'; toDate='2025-05-18';
  lanes=['Lane 01','Lane 02','Lane 03','Lane 04','Lane 05','Lane 06'];
  hoveredCard = '';
  
  reportCards = [
    { title:'Daily Audit Report', desc:'Summary of audit activities performed on a daily basis.', icon:`<svg fill="none" stroke="#1A56DB" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`, iconBg:'#DBEAFE', color:'#1A56DB', count:1 },
    { title:'Revenue Reconciliation Report', desc:'Reconciliation of revenue collected vs system records.', icon:`<svg fill="none" stroke="#16A34A" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`, iconBg:'#DCFCE7', color:'#16A34A', count:1 },
    { title:'RFID vs ANPR Mismatch Report', desc:'Transactions where RFID and ANPR data do not match.', icon:`<svg fill="none" stroke="#7C3AED" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>`, iconBg:'#EDE9FE', color:'#7C3AED', count:1 },
    { title:'Exception Summary Report', desc:'Summary of all exceptions identified in transactions.', icon:`<svg fill="none" stroke="#D97706" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`, iconBg:'#FEF3C7', color:'#D97706', count:1 },
  ];
  reports = [
    {id:1,name:'Daily Audit Report',type:'Daily Audit Report',typeIcon:`<svg fill="none" stroke="#1A56DB" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'All Shifts',lane:'All Lanes',on:'18 May 2025 06:30 PM',by:'Auditor 01',fmt:'PDF',status:'Completed'},
    {id:2,name:'Revenue Reconciliation Report',type:'Revenue Reconciliation Report',typeIcon:`<svg fill="none" stroke="#16A34A" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'All Shifts',lane:'All Lanes',on:'18 May 2025 06:15 PM',by:'Auditor 01',fmt:'Excel',status:'Completed'},
    {id:3,name:'RFID vs ANPR Mismatch Report',type:'RFID vs ANPR Mismatch Report',typeIcon:`<svg fill="none" stroke="#7C3AED" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'All Shifts',lane:'All Lanes',on:'18 May 2025 05:45 PM',by:'Auditor 01',fmt:'PDF',status:'Completed'},
    {id:4,name:'Exception Summary Report',type:'Exception Summary Report',typeIcon:`<svg fill="none" stroke="#D97706" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'All Shifts',lane:'All Lanes',on:'18 May 2025 05:30 PM',by:'Auditor 01',fmt:'Excel',status:'Completed'},
    {id:5,name:'Daily Audit Report - Morning Shift',type:'Daily Audit Report',typeIcon:`<svg fill="none" stroke="#1A56DB" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'Morning Shift (6AM - 2 PM)',lane:'Lane 03',on:'18 May 2025 02:30 PM',by:'Auditor 01',fmt:'PDF',status:'Completed'},
  ];
  del(id:number){ this.reports=this.reports.filter(r=>r.id!==id); }
}
