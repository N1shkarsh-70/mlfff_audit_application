import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Transaction {
  id: number; receipt: string; fastag: string; tc: string;
  vrn: string; lane: string; date: string;
  anprFront: string; anprRear: string; speed: number;
}

@Component({
  selector: 'app-transaction-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .tv-wrap { display:flex; flex-direction:column; height:100%; padding:14px 18px; gap:10px; background:#F9FAFB; overflow:hidden; }
    .filter-row { display:flex; align-items:flex-end; gap:8px; flex-wrap:wrap; padding:10px 12px; background:white; border:1px solid #E5E7EB; border-radius:8px; flex-shrink:0; }
    .filter-field { display:flex; flex-direction:column; gap:3px; }
    .filter-label { font-size:10px; color:#6B7280; font-weight:500; }
    .split { display:flex; gap:10px; flex:1; min-height:0; overflow:hidden; }
    .left-panel { width:42%; min-width:320px; display:flex; flex-direction:column; gap:8px; overflow-y:auto; }
    .right-panel { flex:1; display:flex; flex-direction:column; background:white; border:1px solid #E5E7EB; border-radius:8px; overflow:hidden; }
    .img-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; }
    .img-box { background:#111827; border-radius:6px; aspect-ratio:4/3; display:flex; align-items:center; justify-content:center; overflow:hidden; }
    .img-btn-row { display:flex; gap:4px; justify-content:center; margin-top:4px; }
    .img-btn { display:flex; align-items:center; gap:3px; border:1px solid #E5E7EB; background:white; color:#6B7280; font-size:10px; border-radius:4px; padding:3px 6px; cursor:pointer; font-family:inherit; }
    .det-grid { display:grid; grid-template-columns:auto auto 1fr; font-size:11px; gap:1px 0; }
    .det-label { color:#6B7280; padding:2px 0; width:120px; white-space:nowrap; }
    .det-colon { color:#9CA3AF; padding:2px 4px; }
    .det-val { color:#1F2937; font-weight:500; padding:2px 0; }
    .plate-display { border:2px solid #111827; border-radius:6px; padding:8px 10px; background:white; display:flex; align-items:center; gap:4px; }
    .plate-ind { background:#1A56DB; color:white; font-size:7px; font-weight:800; border-radius:3px; padding:3px 2px; line-height:1; }
    .plate-num { font-size:15px; font-weight:900; color:#111827; letter-spacing:0.05em; }
    .plate-cap { font-size:10px; color:#1A56DB; text-align:center; margin-top:4px; }
    .plates-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:10px; }
    .action-row { display:flex; gap:6px; margin-top:10px; flex-wrap:wrap; }
    .act-btn { display:flex; align-items:center; gap:4px; padding:6px 10px; border:none; border-radius:6px; font-size:11px; font-weight:600; cursor:pointer; font-family:inherit; flex:1; justify-content:center; min-width:80px; }
    .txn-table-wrap { flex:1; overflow:auto; }
    .txn-table { width:100%; border-collapse:collapse; font-size:11px; white-space:nowrap; }
    .txn-table th { position:sticky; top:0; background:#F9FAFB; padding:8px 10px; text-align:left; color:#6B7280; font-weight:600; border-bottom:1px solid #E5E7EB; font-size:10px; text-transform:uppercase; letter-spacing:0.04em; }
    .txn-table td { padding:7px 10px; border-bottom:1px solid #F3F4F6; }
    .txn-row { cursor:pointer; transition:background 0.1s; }
    .txn-row:hover { background:#EFF6FF; }
    .txn-row.sel { background:#DBEAFE; }
    .pager { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-top:1px solid #E5E7EB; flex-shrink:0; }
    .page-btns { display:flex; gap:4px; }
    .page-btn { width:26px; height:26px; display:flex; align-items:center; justify-content:center; border:1px solid #E5E7EB; border-radius:5px; background:white; cursor:pointer; font-size:11px; color:#6B7280; font-family:inherit; }
    .page-btn.active { background:#1A56DB; color:white; border-color:#1A56DB; font-weight:700; }
  `],
  template: `
    <div class="page-content">
      <div class="tv-wrap">
        <h1 style="font-size:17px;font-weight:700;color:#111827;margin:0;flex-shrink:0;">Transaction Verification</h1>

        <!-- Filters -->
        <div class="filter-row">
          <div class="filter-field" style="flex:1;min-width:120px;">
            <span class="filter-label">VRN / Tag</span>
            <input class="form-input" placeholder="Enter VRN or Tag ID" [(ngModel)]="filters.vrn">
          </div>
          <div class="filter-field" style="min-width:110px;">
            <span class="filter-label">MOP ID</span>
            <input class="form-input" placeholder="Enter MOP ID" [(ngModel)]="filters.mopId">
          </div>
          <div class="filter-field" style="min-width:160px;">
            <span class="filter-label">Transaction Date</span>
            <div style="display:flex;align-items:center;gap:5px;border:1px solid #D1D5DB;border-radius:6px;padding:0 8px;height:36px;background:white;font-size:11px;color:#374151;">
              <svg style="width:13px;height:13px;" fill="none" stroke="#9CA3AF" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              18/05/2025 — 18/05/2025
            </div>
          </div>
          <div class="filter-field" style="min-width:100px;">
            <span class="filter-label">Shift</span>
            <select class="form-input" [(ngModel)]="filters.shift"><option value="">All</option><option>Morning</option><option>Evening</option><option>Night</option></select>
          </div>
          <div class="filter-field" style="min-width:100px;">
            <span class="filter-label">Lane</span>
            <select class="form-input" [(ngModel)]="filters.lane"><option value="">All</option>@for(l of lanes;track l){<option>{{l}}</option>}</select>
          </div>
          <div class="filter-field" style="min-width:120px;">
            <span class="filter-label">Vehicle Class</span>
            <select class="form-input" [(ngModel)]="filters.vc"><option value="">All</option><option>Car / Jeep / Van</option><option>LCV</option><option>Bus / Truck</option></select>
          </div>
          <div style="display:flex;gap:6px;padding-top:13px;">
            <button class="btn-primary">
              <svg style="width:13px;height:13px;" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Search
            </button>
            <button style="border:1px solid #D1D5DB;background:white;color:#6B7280;font-size:12px;border-radius:6px;padding:0 12px;cursor:pointer;font-family:inherit;">Reset</button>
          </div>
        </div>

        <!-- Split Panel -->
        <div class="split">
          <!-- LEFT -->
          <div class="left-panel">
            <!-- Images -->
            <div class="card card-p">
              <div class="img-grid">
                @for (v of vehicleViews; track v.label) {
                  <div>
                    <div style="font-size:10px;font-weight:600;color:#6B7280;text-align:center;margin-bottom:4px;">{{v.label}}</div>
                    <div class="img-box">
                      <svg style="width:32px;height:32px;" fill="none" stroke="#4B5563" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <div class="img-btn-row">
                      <button class="img-btn"><svg style="width:11px;height:11px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>Image</button>
                      <button class="img-btn"><svg style="width:11px;height:11px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Video</button>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Transaction Details + Plates + Remark + Actions -->
            <div class="card card-p">
              <div style="font-size:12px;font-weight:700;color:#1F2937;margin-bottom:8px;">Transaction Details</div>
              <div class="det-grid">
                @for (d of txnDetails; track d.label) {
                  <span class="det-label">{{d.label}}</span>
                  <span class="det-colon">:</span>
                  @if (d.isCheck) {
                    <span class="det-val"><input type="checkbox" checked style="accent-color:#1A56DB;"></span>
                  } @else {
                    <span class="det-val">{{d.value}}</span>
                  }
                }
              </div>

              <!-- ANPR Plates -->
              <div class="plates-row">
                <div>
                  <div style="font-size:10px;font-weight:700;color:#374151;text-align:center;margin-bottom:6px;">ANPR Front Plate</div>
                  <div class="plate-display">
                    <span class="plate-ind">IND</span>
                    <span class="plate-num">HR26DK8337</span>
                  </div>
                  <div class="plate-cap">Captured VRN: HR26DK8337</div>
                </div>
                <div>
                  <div style="font-size:10px;font-weight:700;color:#374151;text-align:center;margin-bottom:6px;">ANPR Rear Plate</div>
                  <div class="plate-display">
                    <span class="plate-ind">IND</span>
                    <span class="plate-num">HR26DK8337</span>
                  </div>
                  <div class="plate-cap">Captured VRN: HR26DK8337</div>
                </div>
              </div>

              <!-- Remark -->
              <div style="margin-top:10px;">
                <div style="font-size:12px;font-weight:700;color:#1F2937;margin-bottom:5px;">Audit Remark</div>
                <div style="position:relative;">
                  <textarea [(ngModel)]="remark" maxlength="500" rows="3" placeholder="Enter audit remark here..." style="width:100%;border:1px solid #D1D5DB;border-radius:6px;padding:6px 8px;font-size:11px;resize:none;font-family:inherit;outline:none;"></textarea>
                  <span style="position:absolute;bottom:6px;right:8px;font-size:9px;color:#9CA3AF;">{{remark.length}}/500</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-row">
                <button class="act-btn" style="background:#16A34A;color:white;">
                  <svg style="width:13px;height:13px;" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>Accept
                </button>
                <button class="act-btn" style="background:#DC2626;color:white;">
                  <svg style="width:13px;height:13px;" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>Reject
                </button>
                <button class="act-btn" style="background:#D97706;color:white;">
                  <svg style="width:13px;height:13px;" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Exempt
                </button>
                <button class="act-btn" style="background:#1A56DB;color:white;">
                  <svg style="width:13px;height:13px;" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>ANPR
                </button>
                <button class="act-btn" style="background:#7C3AED;color:white;">
                  <svg style="width:13px;height:13px;" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>Super Audit
                </button>
              </div>
            </div>
          </div>

          <!-- RIGHT: Transaction List -->
          <div class="right-panel">
            <div style="padding:10px 12px;border-bottom:1px solid #E5E7EB;flex-shrink:0;">
              <span style="font-size:13px;font-weight:600;color:#1F2937;">Transaction List (27 entries)</span>
            </div>
            <div class="txn-table-wrap">
              <table class="txn-table">
                <thead>
                  <tr>
                    <th>Receipt</th><th>Fastag</th><th>TC</th><th>VRN</th>
                    <th>Lane</th><th>Transaction Date</th><th>ANPR Front</th><th>ANPR Rear</th>
                    <th style="text-align:right;">Speed (km/h)</th>
                  </tr>
                </thead>
                <tbody>
                  @for (t of transactions; track t.id) {
                    <tr class="txn-row" [class.sel]="selId===t.id" (click)="selId=t.id">
                      <td style="color:#1A56DB;">{{t.receipt}}</td>
                      <td style="color:#6B7280;">{{t.fastag}}</td>
                      <td style="color:#6B7280;">{{t.tc}}</td>
                      <td style="font-weight:600;color:#1F2937;">{{t.vrn}}</td>
                      <td style="color:#6B7280;">{{t.lane}}</td>
                      <td style="color:#6B7280;">{{t.date}}</td>
                      <td><span class="plate-chip"><span style="color:#1A56DB;font-weight:800;font-size:8px;margin-right:2px;">IND</span>{{t.anprFront}}</span></td>
                      <td><span class="plate-chip"><span style="color:#1A56DB;font-weight:800;font-size:8px;margin-right:2px;">IND</span>{{t.anprRear}}</span></td>
                      <td style="text-align:right;color:#374151;">{{t.speed}}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <div class="pager">
              <span style="font-size:11px;color:#6B7280;">Showing 1 to 10 of 27 entries</span>
              <div class="page-btns">
                <button class="page-btn">‹</button>
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn">3</button>
                <button class="page-btn">›</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TransactionVerificationComponent {
  filters = { vrn:'', mopId:'', shift:'', lane:'', vc:'' };
  remark = '';
  selId = 1;
  lanes = ['Lane 01','Lane 02','Lane 03','Lane 04','Lane 05','Lane 06'];
  vehicleViews = [{ label:'ANPR Front Vehicle View' },{ label:'ANPR Rear Vehicle View' },{ label:'Surveillance View' }];
  txnDetails = [
    { label:'Card / Tag', value:'1234567890123456', isCheck:false },
    { label:'Transaction No.', value:'TXN2505180000123', isCheck:false },
    { label:'AVC Transaction', value:'Yes', isCheck:false },
    { label:'Shift No.', value:'1', isCheck:false },
    { label:'Is HMCL', value:'', isCheck:true },
    { label:'MOP', value:'FASTag', isCheck:false },
    { label:'Lane', value:'Lane 05', isCheck:false },
    { label:'Lane Direction', value:'Entry', isCheck:false },
    { label:'HMCL Trans. No.', value:'HMCL250518000987', isCheck:false },
    { label:'Excatory', value:'KM 45+600', isCheck:false },
  ];
  transactions: Transaction[] = [
    {id:1,receipt:'RCP2505180001',fastag:'123456789012',tc:'TC2505180001',vrn:'HR26DK8337',lane:'Lane 05',date:'18-05-2025 10:15:32',anprFront:'HR26DK8337',anprRear:'HR26DK8337',speed:48},
    {id:2,receipt:'RCP2505180002',fastag:'123456789013',tc:'TC2505180002',vrn:'DL12AB1234',lane:'Lane 03',date:'18-05-2025 10:16:45',anprFront:'DL12AB1234',anprRear:'DL12AB1234',speed:46},
    {id:3,receipt:'RCP2505180003',fastag:'123456789014',tc:'TC2505180003',vrn:'HR51CD6789',lane:'Lane 02',date:'18-05-2025 10:17:21',anprFront:'HR51CD6789',anprRear:'HR51CD6789',speed:52},
    {id:4,receipt:'RCP2505180004',fastag:'123456789015',tc:'TC2505180004',vrn:'UP16EF1122',lane:'Lane 06',date:'18-05-2025 10:18:10',anprFront:'UP16EF1122',anprRear:'UP16EF1122',speed:50},
    {id:5,receipt:'RCP2505180005',fastag:'123456789017',tc:'TC2505180005',vrn:'RJ14GH3344',lane:'Lane 01',date:'18-05-2025 10:18:59',anprFront:'RJ14GH3344',anprRear:'RJ14GH3344',speed:45},
    {id:6,receipt:'RCP2505180006',fastag:'123456789017',tc:'TC2505180006',vrn:'PB10IJ5566',lane:'Lane 04',date:'18-05-2025 10:19:41',anprFront:'PB10IJ5566',anprRear:'PB10IJ5566',speed:47},
    {id:7,receipt:'RCP2505180007',fastag:'123456789018',tc:'TC2505180007',vrn:'KA03KL7788',lane:'Lane 03',date:'18-05-2025 10:20:22',anprFront:'KA03KL7788',anprRear:'KA03KL7788',speed:49},
    {id:8,receipt:'RCP2505180008',fastag:'123456789019',tc:'TC2505180008',vrn:'MH12MN9900',lane:'Lane 02',date:'18-05-2025 10:21:05',anprFront:'MH12MN9900',anprRear:'MH12MN9900',speed:51},
    {id:9,receipt:'RCP2505180009',fastag:'123456789020',tc:'TC2505180009',vrn:'GJ05OP1123',lane:'Lane 05',date:'18-05-2025 10:21:48',anprFront:'GJ05OP1123',anprRear:'GJ05OP1123',speed:44},
    {id:10,receipt:'RCP2505180010',fastag:'123456789021',tc:'TC2505180010',vrn:'TN22QR3344',lane:'Lane 06',date:'18-05-2025 10:22:31',anprFront:'TN22QR3344',anprRear:'TN22QR3344',speed:53},
  ];
}
