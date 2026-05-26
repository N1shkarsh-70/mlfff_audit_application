import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard — MLFF Audit'
  },
  {
    path: 'transaction-verification',
    loadComponent: () =>
      import('./features/transaction-verification/transaction-verification.component').then(m => m.TransactionVerificationComponent),
    title: 'Transaction Verification — MLFF Audit'
  },
  {
    path: 'transaction-summary',
    loadComponent: () =>
      import('./features/transaction-summary/transaction-summary.component').then(m => m.TransactionSummaryComponent),
    title: 'Transaction Summary — MLFF Audit'
  },
  {
    path: 'reports-compliance',
    loadComponent: () =>
      import('./features/reports-compliance/reports-compliance.component').then(m => m.ReportsComplianceComponent),
    title: 'Reports & Compliance — MLFF Audit'
  },
  {
    path: 'bank-reconciliation',
    loadComponent: () =>
      import('./features/bank-reconciliation/bank-reconciliation.component').then(m => m.BankReconciliationComponent),
    title: 'Bank Reconciliation — MLFF Audit'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
