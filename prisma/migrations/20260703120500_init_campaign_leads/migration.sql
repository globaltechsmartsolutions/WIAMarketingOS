CREATE TABLE "AgencyLead" (
    "id" TEXT NOT NULL,
    "clinicName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "role" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT,
    "chairs" INTEGER,
    "currentSoftware" TEXT,
    "mainLeak" TEXT NOT NULL,
    "monthlyFirstVisits" INTEGER,
    "missedAppointments" INTEGER,
    "openQuotes" INTEGER,
    "averageTreatmentValue" INTEGER,
    "inactivePatients" INTEGER,
    "estimatedLeakMin" INTEGER,
    "estimatedLeakMax" INTEGER,
    "message" TEXT,
    "source" TEXT NOT NULL DEFAULT 'landing',
    "campaign" TEXT,
    "landingPage" TEXT,
    "status" TEXT NOT NULL DEFAULT 'nuevo',
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "privacyConsent" BOOLEAN NOT NULL DEFAULT false,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgencyLead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AgencyActivity" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgencyActivity_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AgencyLead_status_createdAt_idx" ON "AgencyLead"("status", "createdAt");
CREATE INDEX "AgencyLead_priority_createdAt_idx" ON "AgencyLead"("priority", "createdAt");
CREATE INDEX "AgencyLead_email_idx" ON "AgencyLead"("email");
CREATE INDEX "AgencyLead_phone_idx" ON "AgencyLead"("phone");
CREATE INDEX "AgencyActivity_leadId_createdAt_idx" ON "AgencyActivity"("leadId", "createdAt");
CREATE INDEX "AgencyActivity_type_createdAt_idx" ON "AgencyActivity"("type", "createdAt");

ALTER TABLE "AgencyActivity" ADD CONSTRAINT "AgencyActivity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "AgencyLead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
