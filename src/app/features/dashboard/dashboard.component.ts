import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col h-full bg-[#F9FAFB] p-4 lg:p-5 xl:p-6 overflow-y-auto lg:overflow-hidden gap-4 lg:gap-5 min-h-0 w-full">
      
      <!-- HEADER ROW -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 class="text-[#111827] text-lg lg:text-xl font-extrabold uppercase tracking-wide leading-none">Auditor Dashboard</h1>
          <p class="text-[#6B7280] text-xs lg:text-[13px] mt-1.5">Real-time overview of audit activities and performance</p>
        </div>
        <div class="flex items-end gap-3 lg:gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-[#4B5563] text-[11px] font-semibold">Date</label>
            <div class="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 w-[160px] cursor-pointer hover:border-gray-300 transition-colors shadow-sm">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span class="text-sm font-medium text-gray-700">18 May 2025</span>
              </div>
              <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[#4B5563] text-[11px] font-semibold">Shift</label>
            <div class="relative">
              <select class="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 w-[140px] text-sm font-medium text-gray-700 focus:outline-none hover:border-gray-300 shadow-sm cursor-pointer">
                <option>All Shifts</option>
                <option>Morning</option>
                <option>Evening</option>
              </select>
              <svg class="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- TOP METRICS ROW (6 Cards) -->
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 shrink-0">
        <!-- Card 1 -->
        <div class="bg-white rounded-xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 flex items-start gap-3">
          <div class="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#1A56DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </div>
          <div class="flex flex-col w-full">
            <span class="text-[11px] font-medium text-gray-500 leading-tight">Total Audited<br>Transactions</span>
            <span class="text-xl lg:text-2xl font-extrabold text-gray-900 mt-1 mb-0.5">24,569</span>
            <span class="text-[10px] font-bold text-green-600 flex items-center gap-0.5">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
              12.5% <span class="text-gray-400 font-medium ml-0.5">vs yesterday</span>
            </span>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white rounded-xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 flex items-start gap-3">
          <div class="w-10 h-10 rounded-lg bg-[#DCFCE7] flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          </div>
          <div class="flex flex-col w-full">
            <span class="text-[11px] font-medium text-gray-500 leading-tight mt-1">Approved</span>
            <span class="text-xl lg:text-2xl font-extrabold text-gray-900 mt-2 mb-1">20,134</span>
            <span class="text-[10px] font-bold text-[#16A34A]">81.9% <span class="text-gray-400 font-medium">of total</span></span>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-white rounded-xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 flex items-start gap-3">
          <div class="w-10 h-10 rounded-lg bg-[#FEE2E2] flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </div>
          <div class="flex flex-col w-full">
            <span class="text-[11px] font-medium text-gray-500 leading-tight mt-1">Rejected</span>
            <span class="text-xl lg:text-2xl font-extrabold text-gray-900 mt-2 mb-1">2,345</span>
            <span class="text-[10px] font-bold text-[#DC2626]">9.5% <span class="text-gray-400 font-medium">of total</span></span>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="bg-white rounded-xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 flex items-start gap-3">
          <div class="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#D97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div class="flex flex-col w-full">
            <span class="text-[11px] font-medium text-gray-500 leading-tight mt-1">Pending Queue</span>
            <span class="text-xl lg:text-2xl font-extrabold text-gray-900 mt-2 mb-1">2,090</span>
            <span class="text-[10px] font-bold text-[#D97706]">8.5% <span class="text-gray-400 font-medium">of total</span></span>
          </div>
        </div>

        <!-- Card 5 -->
        <div class="bg-white rounded-xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 flex items-start gap-3">
          <div class="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#9333EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <div class="flex flex-col w-full">
            <span class="text-[11px] font-medium text-gray-500 leading-tight mt-1">Exempted</span>
            <span class="text-xl lg:text-2xl font-extrabold text-gray-900 mt-2 mb-1">1,150</span>
            <span class="text-[10px] font-bold text-[#9333EA]">4.7% <span class="text-gray-400 font-medium">of total</span></span>
          </div>
        </div>

        <!-- Card 6 -->
        <div class="bg-white rounded-xl p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center gap-4">
          <div class="relative w-[68px] h-[68px] shrink-0">
            <canvas #complianceChart class="w-full h-full"></canvas>
            <div class="absolute inset-0 flex items-center justify-center text-[15px] font-extrabold text-gray-900">76%</div>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-xs font-bold text-gray-800 text-center leading-tight">Audit<br>Compliance</span>
            <span class="text-[10px] text-gray-400 mt-3">Today</span>
          </div>
        </div>
      </div>

      <!-- MIDDLE ROW -->
      <div class="flex flex-col lg:flex-row gap-4 shrink-0 lg:shrink lg:min-h-0">
        
        <!-- Audit Productivity -->
        <div class="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 p-4 lg:p-5 flex flex-col w-full lg:w-[35%] xl:w-[30%] shrink-0">
          <div class="flex items-center gap-2 mb-5">
            <svg class="w-4 h-4 text-[#1A56DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <h2 class="text-[13px] font-bold text-gray-900">Audit Productivity (Today)</h2>
          </div>
          
          <div class="grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-y-6 gap-x-2 flex-1 items-center">
            <!-- Metric 1 -->
            <div class="flex flex-col items-center justify-between h-full">
              <span class="text-[10px] font-medium text-gray-500 text-center leading-tight mb-2">Audited by You</span>
              <span class="text-[22px] font-extrabold text-gray-900 mb-4">532</span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-[#1A56DB] bg-blue-50 mt-auto">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
            </div>
            <!-- Metric 2 -->
            <div class="flex flex-col items-center justify-between h-full border-l border-gray-100">
              <span class="text-[10px] font-medium text-gray-500 text-center leading-tight mb-2">Avg. Handling<br>Time</span>
              <span class="text-[22px] font-extrabold text-gray-900 mb-4">1m 32s</span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-[#1A56DB] bg-blue-50 mt-auto">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
            </div>
            <!-- Metric 3 -->
            <div class="flex flex-col items-center justify-between h-full border-l border-gray-100">
              <span class="text-[10px] font-medium text-gray-500 text-center leading-tight mb-2">Accuracy</span>
              <span class="text-[22px] font-extrabold text-gray-900 mb-4">96.4%</span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-[#DC2626] bg-red-50 mt-auto">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
            </div>
            <!-- Metric 4 -->
            <div class="flex flex-col items-center justify-between h-full border-l border-gray-100">
              <span class="text-[10px] font-medium text-gray-500 text-center leading-tight mb-2">Vs Yesterday<br>(Accuracy)</span>
              <span class="text-[22px] font-extrabold text-[#16A34A] flex items-center gap-0.5 mb-4"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg> 8.7%</span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-[#D97706] bg-orange-50 mt-auto">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Audit Trend -->
        <div class="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 p-4 lg:p-5 flex flex-col flex-1 min-h-[250px] lg:min-h-0 lg:h-full">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-2 shrink-0">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#1A56DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>
              <h2 class="text-[13px] font-bold text-gray-900">Audit Trend</h2>
            </div>
            <div class="flex bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
              <button class="px-4 py-1.5 text-[11px] font-bold bg-[#EFEDFD] text-[#1A56DB]">Daily</button>
              <button class="px-4 py-1.5 text-[11px] font-medium text-gray-500 hover:bg-gray-50 border-l border-gray-200">Weekly</button>
              <button class="px-4 py-1.5 text-[11px] font-medium text-gray-500 hover:bg-gray-50 border-l border-gray-200">Monthly</button>
            </div>
          </div>
          
          <!-- Custom Legend -->
          <div class="flex items-center justify-center gap-6 mb-2 shrink-0">
            <div class="flex items-center gap-1.5"><div class="w-2.5 h-0.5 bg-[#16A34A]"></div><span class="text-[10px] font-medium text-gray-600">Approved</span></div>
            <div class="flex items-center gap-1.5"><div class="w-2.5 h-0.5 bg-[#DC2626]"></div><span class="text-[10px] font-medium text-gray-600">Rejected</span></div>
            <div class="flex items-center gap-1.5"><div class="w-2.5 h-0.5 bg-[#F59E0B]"></div><span class="text-[10px] font-medium text-gray-600">Pending Queue</span></div>
            <div class="flex items-center gap-1.5"><div class="w-2.5 h-0.5 bg-[#9333EA]"></div><span class="text-[10px] font-medium text-gray-600">Exempted</span></div>
          </div>

          <div class="relative flex-1 min-h-0 w-full">
            <canvas #trendChart></canvas>
          </div>
        </div>

      </div>

      <!-- BOTTOM ROW -->
      <div class="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        
        <!-- Transaction Starts Summary -->
        <div class="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 p-4 lg:p-5 flex flex-col w-full lg:w-[35%] xl:w-[30%] shrink-0 lg:h-full">
          <div class="flex items-center gap-2 mb-4 shrink-0">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <h2 class="text-[13px] font-bold text-gray-900">Transaction Starts Summary (Today)</h2>
          </div>
          
          <div class="flex items-center justify-between flex-1 min-h-0 gap-4 pl-2 pr-4">
            <!-- Donut -->
            <div class="relative w-[130px] h-[130px] shrink-0">
              <canvas #summaryDonut></canvas>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[10px] font-semibold text-gray-600">Total</span>
                <span class="text-sm font-extrabold text-gray-900">24,569</span>
              </div>
            </div>
            
            <!-- Custom Table Legend -->
            <div class="flex-1">
              <div class="flex flex-col gap-2.5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-[#16A34A]"></div><span class="text-[11px] text-gray-600 font-medium">Approved</span></div>
                  <span class="text-[11px] font-bold text-gray-900">20,134</span>
                  <span class="text-[10px] font-bold text-[#16A34A] border border-[#16A34A] bg-[#DCFCE7] px-1.5 py-[1px] rounded flex items-center justify-center w-10">81.9%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-[#DC2626]"></div><span class="text-[11px] text-gray-600 font-medium">Rejected</span></div>
                  <span class="text-[11px] font-bold text-gray-900">2,345</span>
                  <span class="text-[10px] font-bold text-[#DC2626] border border-[#DC2626] bg-[#FEE2E2] px-1.5 py-[1px] rounded flex items-center justify-center w-10">9.5%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-[#F59E0B]"></div><span class="text-[11px] text-gray-600 font-medium">Pending Queue</span></div>
                  <span class="text-[11px] font-bold text-gray-900">2,090</span>
                  <span class="text-[10px] font-bold text-[#F59E0B] border border-[#F59E0B] bg-[#FEF3C7] px-1.5 py-[1px] rounded flex items-center justify-center w-10">8.5%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-[#9333EA]"></div><span class="text-[11px] text-gray-600 font-medium">Exempted</span></div>
                  <span class="text-[11px] font-bold text-gray-900">1,150</span>
                  <span class="text-[10px] font-bold text-[#9333EA] border border-[#9333EA] bg-[#F3E8FF] px-1.5 py-[1px] rounded flex items-center justify-center w-10">4.7%</span>
                </div>
                <div class="flex items-center justify-between pt-2 mt-1 border-t border-gray-100">
                  <span class="text-[11px] font-bold text-gray-900">Total</span>
                  <span class="text-[11px] font-extrabold text-gray-900 mr-[48px]">24,569</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Auditor Performance Table -->
        <div class="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 p-4 lg:p-5 flex flex-col flex-1 min-w-0 min-h-0 lg:h-full">
          <div class="flex items-center justify-between mb-3 shrink-0">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#1A56DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <h2 class="text-[13px] font-bold text-gray-900">Audit Performance by Auditor (Today)</h2>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-semibold text-gray-500">Shift:</span>
              <div class="relative">
                <select class="appearance-none bg-white border border-gray-200 rounded-md px-2 py-1 pr-6 text-[11px] font-medium text-gray-700 focus:outline-none hover:border-gray-300">
                  <option>All Shifts</option>
                </select>
                <svg class="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
          </div>

          <div class="flex-1 overflow-auto">
            <table class="w-full text-[11px] text-right whitespace-nowrap">
              <thead class="sticky top-0 bg-white z-10">
                <tr>
                  <th class="text-left font-bold text-gray-800 pb-3 border-b border-gray-200">Auditor ID</th>
                  <th class="font-bold text-gray-800 pb-3 border-b border-gray-200 px-3">Audited</th>
                  <th class="font-bold text-[#16A34A] pb-3 border-b border-gray-200 px-3">Approved</th>
                  <th class="font-bold text-[#DC2626] pb-3 border-b border-gray-200 px-3">Rejected</th>
                  <th class="font-bold text-[#F59E0B] pb-3 border-b border-gray-200 px-3">Pending Queue</th>
                  <th class="font-bold text-[#9333EA] pb-3 border-b border-gray-200 px-3">Exempted</th>
                  <th class="font-bold text-gray-800 pb-3 border-b border-gray-200 pl-3">Accuracy</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 font-medium">
                <tr>
                  <td class="text-left py-2.5 text-[#1A56DB] font-bold border-b border-gray-50">Auditor 01 (You)</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">532</td>
                  <td class="px-3 py-2.5 text-[#16A34A] border-b border-gray-50">438</td>
                  <td class="px-3 py-2.5 text-[#DC2626] border-b border-gray-50">38</td>
                  <td class="px-3 py-2.5 text-[#F59E0B] border-b border-gray-50">45</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">56</td>
                  <td class="pl-3 py-2.5 text-gray-900 border-b border-gray-50">96.4%</td>
                </tr>
                <tr>
                  <td class="text-left py-2.5 border-b border-gray-50">Auditor 02</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">486</td>
                  <td class="px-3 py-2.5 text-[#16A34A] border-b border-gray-50">394</td>
                  <td class="px-3 py-2.5 text-[#DC2626] border-b border-gray-50">42</td>
                  <td class="px-3 py-2.5 text-[#F59E0B] border-b border-gray-50">41</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">50</td>
                  <td class="pl-3 py-2.5 text-gray-900 border-b border-gray-50">95.7%</td>
                </tr>
                <tr>
                  <td class="text-left py-2.5 border-b border-gray-50">Auditor 03</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">472</td>
                  <td class="px-3 py-2.5 text-[#16A34A] border-b border-gray-50">381</td>
                  <td class="px-3 py-2.5 text-[#DC2626] border-b border-gray-50">41</td>
                  <td class="px-3 py-2.5 text-[#F59E0B] border-b border-gray-50">40</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">50</td>
                  <td class="pl-3 py-2.5 text-gray-900 border-b border-gray-50">95.3%</td>
                </tr>
                <tr>
                  <td class="text-left py-2.5 border-b border-gray-50">Auditor 04</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">454</td>
                  <td class="px-3 py-2.5 text-[#16A34A] border-b border-gray-50">365</td>
                  <td class="px-3 py-2.5 text-[#DC2626] border-b border-gray-50">39</td>
                  <td class="px-3 py-2.5 text-[#F59E0B] border-b border-gray-50">41</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">50</td>
                  <td class="pl-3 py-2.5 text-gray-900 border-b border-gray-50">95.2%</td>
                </tr>
                <tr>
                  <td class="text-left py-2.5 border-b border-gray-50">Auditor 05</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">421</td>
                  <td class="px-3 py-2.5 text-[#16A34A] border-b border-gray-50">335</td>
                  <td class="px-3 py-2.5 text-[#DC2626] border-b border-gray-50">36</td>
                  <td class="px-3 py-2.5 text-[#F59E0B] border-b border-gray-50">38</td>
                  <td class="px-3 py-2.5 border-b border-gray-50">50</td>
                  <td class="pl-3 py-2.5 text-gray-900 border-b border-gray-50">95.0%</td>
                </tr>
                <tr class="font-extrabold text-gray-900 bg-gray-50">
                  <td class="text-left py-3 rounded-l-lg pl-2 mt-1 block">Total</td>
                  <td class="px-3 py-3 mt-1">2,365</td>
                  <td class="px-3 py-3 text-[#16A34A] mt-1">1,913</td>
                  <td class="px-3 py-3 text-[#DC2626] mt-1">196</td>
                  <td class="px-3 py-3 text-[#F59E0B] mt-1">205</td>
                  <td class="px-3 py-3 text-[#9333EA] mt-1">256</td>
                  <td class="pl-3 py-3 text-[#16A34A] rounded-r-lg mt-1">95.9%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- FOOTER INFO -->
      <div class="flex items-center gap-1.5 shrink-0 pt-1 pb-1">
        <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span class="text-[10px] text-gray-400">All data is as of 18 May 2025 (Today) for the selected shift and updated in real-time.</span>
      </div>

    </div>
  `
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('complianceChart') complianceChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('trendChart') trendChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('summaryDonut') summaryDonutRef!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];
  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit() {
    // Delay initialization slightly to ensure grid layout is computed properly
    setTimeout(() => {
      this.initComplianceChart();
      this.initTrendChart();
      this.initSummaryDonut();
    }, 100);

    // Watch for resizes to handle chart scaling properly
    this.resizeObserver = new ResizeObserver(() => {
      this.charts.forEach(chart => chart.resize());
    });
    
    if (this.trendChartRef) {
      this.resizeObserver.observe(this.trendChartRef.nativeElement.parentElement!);
    }
  }

  private initComplianceChart() {
    const el = this.complianceChartRef?.nativeElement;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    this.charts.push(new Chart(ctx, {
      type: 'doughnut',
      data: { datasets: [{ data: [76, 24], backgroundColor: ['#1A56DB', '#F3F4F6'], borderWidth: 0 }] },
      options: { 
        responsive: true, 
        maintainAspectRatio: true, 
        cutout: '78%', 
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { duration: 800 }
      }
    }));
  }

  private initTrendChart() {
    const el = this.trendChartRef?.nativeElement;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    
    this.charts.push(new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['12 May','13 May','14 May','15 May','16 May','17 May','18 May'],
        datasets: [
          { label:'Approved', data:[1800,2100,1950,2200,2100,2400,2600], borderColor:'#16A34A', backgroundColor:'transparent', tension:0.4, pointRadius:4, pointBackgroundColor:'#fff', pointBorderColor:'#16A34A', pointBorderWidth:2, borderWidth:2 },
          { label:'Rejected', data:[1000,1200,1050,1200,1100,1500,1400], borderColor:'#DC2626', backgroundColor:'transparent', tension:0.4, pointRadius:4, pointBackgroundColor:'#fff', pointBorderColor:'#DC2626', pointBorderWidth:2, borderWidth:2 },
          { label:'Pending Queue', data:[500,550,500,580,550,750,600], borderColor:'#F59E0B', backgroundColor:'transparent', tension:0.4, pointRadius:4, pointBackgroundColor:'#fff', pointBorderColor:'#F59E0B', pointBorderWidth:2, borderWidth:2 },
          { label:'Exempted', data:[100,120,110,130,120,150,140], borderColor:'#9333EA', backgroundColor:'transparent', tension:0.4, pointRadius:4, pointBackgroundColor:'#fff', pointBorderColor:'#9333EA', pointBorderWidth:2, borderWidth:2 },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 10, right: 10 }
        },
        plugins: { 
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1F2937',
            padding: 10,
            titleFont: { size: 12 },
            bodyFont: { size: 11 },
            displayColors: true,
            boxPadding: 4
          }
        },
        scales: {
          x: { 
            grid: { display: false }, 
            ticks: { font: { size: 10 }, color: '#6B7280' },
            border: { display: false }
          },
          y: { 
            beginAtZero: true, 
            max: 3000, 
            ticks: { 
              font: { size: 10 }, 
              color: '#6B7280', 
              callback: (v:any)=>v>=1000?(v/1000)+'K':v,
              stepSize: 1000
            }, 
            grid: { color: '#F3F4F6' },
            border: { display: false }
          }
        }
      }
    }));
  }

  private initSummaryDonut() {
    const el = this.summaryDonutRef?.nativeElement;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    this.charts.push(new Chart(ctx, {
      type: 'doughnut',
      data: { 
        labels: ['Approved', 'Rejected', 'Pending Queue', 'Exempted'],
        datasets: [{ 
          data:[81.9, 9.5, 8.5, 4.7], 
          backgroundColor:['#16A34A','#DC2626','#F59E0B','#9333EA'], 
          borderWidth: 2, 
          borderColor: '#fff',
          hoverOffset: 4
        }] 
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: true, 
        cutout: '68%', 
        plugins: { 
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1F2937',
            padding: 10,
            bodyFont: { size: 11 },
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }, 
        animation: { duration: 800 } 
      }
    }));
  }

  ngOnDestroy() { 
    this.charts.forEach(c => c.destroy()); 
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
