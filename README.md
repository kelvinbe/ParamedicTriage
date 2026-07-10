# Project Name

# Paramedic Triage

<p align="center">
A React Native application designed for paramedics to quickly capture patient triage information in low-connectivity environments. The application prioritizes fast thumb-input, immediate clinical feedback, offline-first storage, and automatic synchronization once connectivity is restored.
</p>

---

## Overview

Paramedic Triage is an offline-first React Native mobile application that enables paramedics to rapidly record patient information during emergency situations.

The application allows healthcare workers to:

- Capture patient details using a single-screen form.
- Classify patients by triage priority.
- Receive an immediate risk assessment.
- Continue working without an internet connection.
- Automatically synchronize unsent records once connectivity returns.

The project simulates a backend API using a local repository with an artificial network delay, allowing the offline synchronization queue to be demonstrated without requiring a live backend.

---

# Functionality

- Create new triage records.
- Form validation before submission.
- Visual highlighting for critical patients.
- Risk assessment based on selected priority.
- Offline data persistence using MMKV.
- Automatic retry queue for unsent records.
- Network status detection.
- Automatic synchronization when internet connectivity returns.
- Keyboard-aware layout for mobile usability.
- Loading and error state handling.

---

# Design Decisions

### Offline First Architecture

Emergency responders cannot always rely on stable internet connectivity. For that reason the application was designed with an offline-first approach.

Whenever a submission cannot reach the simulated API, the patient record is immediately stored locally inside MMKV storage. This ensures no patient information is lost.

---

### MMKV Storage

Instead of AsyncStorage, MMKV was selected because it offers:

- significantly faster read/write performance
- synchronous operations
- lower overhead
- efficient storage for mobile applications

MMKV stores every pending triage record until it has been successfully synchronized.

---

### Context API

React Context was chosen for global state management.

The TriageContext is responsible for:

- submitting patients
- exposing loading state
- exposing API errors
- storing the latest triage response
- coordinating synchronization

Since the application is relatively small, introducing Redux or Zustand would have added unnecessary complexity.

---

### Component Separation

The application separates UI into reusable components:

- PatientInput
- PrioritySelector
- StatusSelector
- SubmitButton

This keeps the screen component focused on business logic while making components reusable and easier to maintain.

---

### Mock API

The assessment specifies that a live backend is not required.

Instead of building a backend server, a local mock repository simulates an API by:

- introducing a network delay
- generating triage responses based on patient priority

This approach allows the synchronization queue to be fully demonstrated while keeping the project lightweight.

---

# Implementation Decisions

### Form Validation

Before submission the application validates:

- Patient Name
- Condition Description
- Priority selection
- Status selection

Text fields must contain alphabetic characters and required selections must be made before the form can be submitted.

---

### Risk Classification

The simulated API returns different responses depending on the selected priority.

| Priority | Risk Level | Recommendation |
|-----------|------------|----------------|
| 1 | CRITICAL | Immediate doctor attention |
| 2 | HIGH | Doctor assessment required |
| 3-5 | LOW | Patient can be monitored |

Critical patients are visually highlighted to make urgent cases immediately noticeable.

---

### Sync Queue

The synchronization queue is responsible for guaranteeing eventual delivery of patient records.

Each record saved offline contains:

- id
- patient details
- synced flag
- retry count
- timestamp

When internet connectivity becomes available:

1. NetInfo detects a network change.
2. `syncPendingRecords()` is triggered.
3. Every pending record is sent to the simulated API.
4. Successfully uploaded records are removed from MMKV.
5. Failed records remain in storage for the next synchronization attempt.

A synchronization lock prevents multiple sync operations from running simultaneously.

---

### Connectivity Monitoring

The application listens for connectivity changes using:

```
@react-native-community/netinfo
```

Whenever the device reconnects to the internet, synchronization begins automatically without requiring user interaction.


# How the Sync Queue Works

### Offline Submission

```
User submits form - Network unavailable - Save record to MMKV -Display "Saved Locally"
```

---

### Online Synchronization

```
Internet Restored - NetInfo detects connection - syncPendingRecords() - Loop through pending records - POST to mock API - Success?
   │           │
  Yes          No
   │           │
Remove       Keep record
Record       for retry
```

---

# Testing

The project includes unit tests covering:

- triage API logic
- local storage service
- synchronization service
- context functionality
- form validation

Native modules such as NetInfo and MMKV are mocked to allow tests to execute without requiring a physical device.

---

# Technologies Used

- React Native
- TypeScript
- React Context API
- MMKV Storage
- NetInfo
- React Navigation
- Jest
- React Native Testing Library

---

# Project Setup Guide

Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project

```bash
cd ParamedicTriage
```

Install dependencies

```bash
npm install
```

Start Metro

```bash
npm start
```

Run Android

```bash
npm run android
```

Run tests

```bash
npm test
```

---

# Demonstrating Offline Synchronization

1. Launch the application.
2. Disable the device internet connection.
3. Submit one or more patient records.
4. Observe that records are saved locally.
5. Re-enable internet.
6. Watch the terminal logs as pending records are synchronized automatically.

Example output:

```
Connection changed: true

Calling syncPendingRecords()

Syncing 3 records...

Synced 764cd4cd-f193...

Synced 4e3043b6-3a36...

Remaining records: []
```

---

# Future Improvements

- Exponential retry backoff.
- Background synchronization using Headless JS or WorkManager.
- Persistent synchronization history.
- Secure encrypted storage.
- Real REST backend integration.
- Authentication and user sessions.
- Patient history screen.
- Queue status indicator within the UI.

---

# Author

**Kelvin Beno**

Software Developer