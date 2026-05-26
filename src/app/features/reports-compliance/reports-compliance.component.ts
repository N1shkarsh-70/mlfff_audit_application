import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports-compliance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .rc-wrap { display:flex; flex-direction:column; gap:12px; padding:16px 20px; height:100%; background:#F9FAFB; }
    .top-row { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; flex-shrink:0; }
    .filter-inline { display:flex; align-items:flex-end; gap:8px; flex-wrap:wrap; }
    .fl { display:flex; flex-direction:column; gap:3px; }
    .fl label { font-size:10px; color:#6B7280; font-weight:500; }
    .date-box { display:flex; align-items:center; gap:6px; border:1px solid #D1D5DB; border-radius:6px; padding:0 10px; height:36px; background:white; font-size:12px; color:#374151; cursor:pointer; white-space:nowrap; }
    .cards-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; flex-shrink:0; }
    @media(max-width:1000px){ .cards-row { grid-template-columns:repeat(2,1fr); } }
    .rcard { background:white; border:1px solid #E5E7EB; border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:10px; }
    .rcard-top { display:flex; gap:10px; }
    .rcard-icon { width:40px; height:40px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .gen-tbl { width:100%; border-collapse:collapse; font-size:11px; white-space:nowrap; }
    .gen-tbl th { text-align:left; padding:8px 14px; color:#6B7280; font-weight:600; border-bottom:1px solid #E5E7EB; background:#F9FAFB; font-size:10px; text-transform:uppercase; letter-spacing:.03em; position:sticky; top:0; }
    .gen-tbl td { padding:10px 14px; border-bottom:1px solid #F3F4F6; color:#374151; }
    .gen-tbl tr:hover td { background:#F9FAFB; }
    .table-card { background:white; border:1px solid #E5E7EB; border-radius:8px; flex:1; display:flex; flex-direction:column; overflow:hidden; }
    .gen-btn { display:inline-flex; align-items:center; gap:4px; padding:6px 12px; border-radius:6px; font-size:11px; font-weight:600; cursor:pointer; font-family:inherit; border-width:1.5px; border-style:solid; background:transparent; transition:background 0.15s; }
    .icon-act { background:transparent; border:none; cursor:pointer; padding:3px; border-radius:4px; color:#6B7280; }
    .icon-act:hover { color:#1A56DB; background:#EFF6FF; }
  `],
  template: `
    <div class="page-content">
      <div class="rc-wrap">
        <!-- Top Row -->
        <div class="top-row">
          <div>
            <h1 style="font-size:18px;font-weight:800;color:#111827;letter-spacing:.04em;text-transform:uppercase;margin:0;">Reports & Compliance</h1>
            <p style="font-size:11px;color:#6B7280;margin:2px 0 0;">Access and generate audit and compliance reports</p>
          </div>
          <div class="filter-inline">
            <div class="fl">
              <label>From Date</label>
              <div class="date-box"><svg style="width:13px;height:13px;" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>18 May 2025</div>
            </div>
            <div class="fl">
              <label>To Date</label>
              <div class="date-box"><svg style="width:13px;height:13px;" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>18 May 2025</div>
            </div>
            <div class="fl" style="min-width:130px;">
              <label>Shift</label>
              <select class="form-input" [(ngModel)]="shift"><option>All Shifts</option><option>Morning</option><option>Evening</option></select>
            </div>
            <div class="fl" style="min-width:120px;">
              <label>Lane</label>
              <select class="form-input" [(ngModel)]="lane"><option>All Lanes</option>@for(l of lanes;track l){<option>{{l}}</option>}</select>
            </div>
            <button class="btn-primary" style="height:36px;margin-top:13px;">
              <svg style="width:13px;height:13px;" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Generate
            </button>
          </div>
        </div>

        <!-- Report Cards -->
        <div class="cards-row">
          @for (c of reportCards; track c.title) {
            <div class="rcard">
              <div class="rcard-top">
                <div class="rcard-icon" [style.background]="c.iconBg">
                  <span [innerHTML]="c.icon"></span>
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
                    <span style="font-size:12px;font-weight:700;color:#1F2937;line-height:1.3;">{{c.title}}</span>
                    <div style="text-align:right;flex-shrink:0;">
                      <div style="font-size:16px;font-weight:800;color:#111827;">{{c.count}}</div>
                      <div style="font-size:9px;color:#9CA3AF;">Report</div>
                    </div>
                  </div>
                  <p style="font-size:10px;color:#6B7280;margin:4px 0 0;line-height:1.4;">{{c.desc}}</p>
                </div>
              </div>
              <button class="gen-btn" [style.borderColor]="c.color" [style.color]="c.color" (click)="c.count=c.count+1" style="width:100%;justify-content:center;">Generate Report</button>
            </div>
          }
        </div>

        <!-- Generated Reports Table -->
        <div class="table-card">
          <div style="padding:10px 14px;border-bottom:1px solid #E5E7EB;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
            <div style="display:flex;align-items:center;gap:6px;">
              <svg style="width:16px;height:16px;" fill="none" stroke="#1A56DB" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span style="font-size:13px;font-weight:600;color:#1F2937;">Generated Reports</span>
            </div>
            <button class="btn-primary" style="font-size:11px;padding:6px 12px;">
              <svg style="width:13px;height:13px;" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Export All Reports
            </button>
          </div>
          <div style="flex:1;overflow:auto;">
            <table class="gen-tbl">
              <thead>
                <tr><th>Report Name</th><th>Report Type</th><th>From Date</th><th>To Date</th><th>Shift</th><th>Lane</th><th>Generated On</th><th>Generated By</th><th>Format</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                @for (r of reports; track r.id) {
                  <tr>
                    <td style="font-weight:600;color:#111827;">{{r.name}}</td>
                    <td><div style="display:flex;align-items:center;gap:5px;"><span [innerHTML]="r.typeIcon"></span>{{r.type}}</div></td>
                    <td>{{r.from}}</td><td>{{r.to}}</td><td>{{r.shift}}</td><td>{{r.lane}}</td>
                    <td>{{r.on}}</td><td>{{r.by}}</td>
                    <td><span [style.color]="r.fmt==='PDF'?'#DC2626':'#16A34A'" style="font-weight:600;display:flex;align-items:center;gap:3px;"><svg style="width:12px;height:12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>{{r.fmt}}</span></td>
                    <td><span class="badge-completed">{{r.status}}</span></td>
                    <td>
                      <div style="display:flex;gap:6px;">
                        <button class="icon-act" title="Download"><svg style="width:15px;height:15px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg></button>
                        <button class="icon-act" title="Delete" (click)="del(r.id)" style="color:#6B7280;" onmouseover="this.style.color='#DC2626'" onmouseout="this.style.color='#6B7280'"><svg style="width:15px;height:15px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <p style="font-size:10px;color:#9CA3AF;display:flex;align-items:center;gap:4px;flex-shrink:0;padding-bottom:2px;">
          <svg style="width:12px;height:12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          All reports are generated based on the selected filters.
        </p>
      </div>
    </div>
  `
})
export class ReportsComplianceComponent {
  shift='All Shifts'; lane='All Lanes';
  lanes=['Lane 01','Lane 02','Lane 03','Lane 04','Lane 05','Lane 06'];
  reportCards = [
    { title:'Daily Audit Report', desc:'Summary of audit activities performed on a daily basis.', icon:`<svg style="width:20px;height:20px;" fill="none" stroke="#1A56DB" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`, iconBg:'#DBEAFE', color:'#1A56DB', count:1 },
    { title:'Revenue Reconciliation Report', desc:'Reconciliation of revenue collected vs system records.', icon:`<svg style="width:20px;height:20px;" fill="none" stroke="#16A34A" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`, iconBg:'#DCFCE7', color:'#16A34A', count:1 },
    { title:'RFID vs ANPR Mismatch Report', desc:'Transactions where RFID and ANPR data do not match.', icon:`<svg style="width:20px;height:20px;" fill="none" stroke="#7C3AED" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>`, iconBg:'#EDE9FE', color:'#7C3AED', count:1 },
    { title:'Exception Summary Report', desc:'Summary of all exceptions identified in transactions.', icon:`<svg style="width:20px;height:20px;" fill="none" stroke="#D97706" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`, iconBg:'#FEF3C7', color:'#D97706', count:1 },
  ];
  reports = [
    {id:1,name:'Daily Audit Report',type:'Daily Audit Report',typeIcon:`<svg style="width:13px;height:13px;" fill="none" stroke="#1A56DB" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'All Shifts',lane:'All Lanes',on:'18 May 2025 06:30 PM',by:'Auditor 01',fmt:'PDF',status:'Completed'},
    {id:2,name:'Revenue Reconciliation Report',type:'Revenue Reconciliation Report',typeIcon:`<svg style="width:13px;height:13px;" fill="none" stroke="#16A34A" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'All Shifts',lane:'All Lanes',on:'18 May 2025 06:15 PM',by:'Auditor 01',fmt:'Excel',status:'Completed'},
    {id:3,name:'RFID vs ANPR Mismatch Report',type:'RFID vs ANPR Mismatch Report',typeIcon:`<svg style="width:13px;height:13px;" fill="none" stroke="#7C3AED" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'All Shifts',lane:'All Lanes',on:'18 May 2025 05:45 PM',by:'Auditor 01',fmt:'PDF',status:'Completed'},
    {id:4,name:'Exception Summary Report',type:'Exception Summary Report',typeIcon:`<svg style="width:13px;height:13px;" fill="none" stroke="#D97706" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'All Shifts',lane:'All Lanes',on:'18 May 2025 05:30 PM',by:'Auditor 01',fmt:'Excel',status:'Completed'},
    {id:5,name:'Daily Audit Report - Morning Shift',type:'Daily Audit Report',typeIcon:`<svg style="width:13px;height:13px;" fill="none" stroke="#1A56DB" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,from:'18 May 2025',to:'18 May 2025',shift:'Morning Shift (6AM-2PM)',lane:'Lane 03',on:'18 May 2025 02:30 PM',by:'Auditor 01',fmt:'PDF',status:'Completed'},
  ];
  del(id:number){ this.reports=this.reports.filter(r=>r.id!==id); }
}
