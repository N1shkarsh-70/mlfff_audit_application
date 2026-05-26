import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="bg-white border-b border-gray-200 h-[72px] flex items-center justify-between px-6 shrink-0 z-10 w-full shadow-sm">
      
      <!-- LEFT: Logo and Title -->
      <div class="flex items-center gap-3">
        <!-- Logo Icon (Approximation of the blue hexagon with graph) -->
        <div class="w-10 h-10 bg-[#1A56DB] rounded-lg flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold text-[#111827] leading-none tracking-tight">MLFF</span>
          <span class="text-[9px] font-bold text-[#1A56DB] tracking-[0.05em] mt-[3px]">TRANSACTION AUDIT SYSTEM</span>
        </div>
      </div>

      <!-- CENTER: Navigation Links -->
      <div class="flex h-full">
        @for (link of navLinks; track link.path) {
          <a [routerLink]="link.path"
             class="relative flex items-center gap-2 px-5 h-full text-[13px] font-semibold transition-colors cursor-pointer"
             [class.text-[#1A56DB]]="isActive(link.path)"
             [class.text-[#4B5563]]="!isActive(link.path)"
             [class.hover:bg-gray-50]="!isActive(link.path)">
             
            <!-- Icon -->
            <span [innerHTML]="link.icon" 
                  [class.text-[#1A56DB]]="isActive(link.path)" 
                  [class.text-[#6B7280]]="!isActive(link.path)"
                  class="flex items-center justify-center"></span>
            
            <!-- Label -->
            <span>{{ link.label }}</span>
            
            <!-- Active Bottom Border -->
            @if (isActive(link.path)) {
              <div class="absolute bottom-0 left-0 w-full h-[3px] bg-[#1A56DB] rounded-t-md"></div>
            }
          </a>
        }
      </div>

      <!-- RIGHT: Notifications & User Profile -->
      <div class="flex items-center gap-6">
        <!-- Notification Bell -->
        <button class="relative p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full hover:bg-gray-100">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <!-- Red Badge -->
          <span class="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-600 border-2 border-white rounded-full">
            12
          </span>
        </button>

        <!-- Divider -->
        <div class="w-px h-8 bg-gray-200"></div>

        <!-- User Profile Dropdown -->
        <div class="flex items-center gap-3 cursor-pointer group">
          <div class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300">
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-[13px] font-bold text-[#111827] group-hover:text-[#1A56DB] transition-colors leading-tight">Auditor 01</span>
            <span class="text-[11px] text-[#6B7280] leading-tight mt-[2px]">Senior Auditor</span>
          </div>
          <svg class="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
    </nav>
  `
})
export class NavbarComponent {
  navLinks = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>` 
    },
    { 
      path: '/transaction-verification', 
      label: 'Transaction Verification', 
      icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>` 
    },
    { 
      path: '/transaction-summary', 
      label: 'Transaction Summary', 
      icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>` 
    },
    { 
      path: '/reports-compliance', 
      label: 'Reports & Compliance', 
      icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>` 
    },
    { 
      path: '/bank-reconciliation', 
      label: 'Bank Reconciliation', 
      icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>` 
    }
  ];

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }
}
