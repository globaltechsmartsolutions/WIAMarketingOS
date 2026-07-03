CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "vertical" TEXT NOT NULL,
    "offer" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "goal" TEXT,
    "landingPath" TEXT,
    "budgetCents" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT,
    "website" TEXT,
    "city" TEXT,
    "country" TEXT NOT NULL DEFAULT 'ES',
    "sizeLabel" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "privacyConsent" BOOLEAN NOT NULL DEFAULT false,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "companyId" TEXT,
    "contactId" TEXT,
    "agencyLeadId" TEXT,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nuevo',
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "source" TEXT NOT NULL DEFAULT 'manual',
    "landingPage" TEXT,
    "problem" TEXT,
    "estimatedValueMin" INTEGER,
    "estimatedValueMax" INTEGER,
    "score" INTEGER NOT NULL DEFAULT 0,
    "nextStep" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "companyId" TEXT,
    "contactId" TEXT,
    "leadId" TEXT,
    "title" TEXT NOT NULL,
    "stage" TEXT NOT NULL DEFAULT 'cualificacion',
    "status" TEXT NOT NULL DEFAULT 'open',
    "valueCents" INTEGER,
    "probability" INTEGER NOT NULL DEFAULT 20,
    "expectedCloseAt" TIMESTAMP(3),
    "lostReason" TEXT,
    "wonAt" TIMESTAMP(3),
    "lostAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "companyId" TEXT,
    "contactId" TEXT,
    "leadId" TEXT,
    "dealId" TEXT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "outcome" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "companyId" TEXT,
    "contactId" TEXT,
    "leadId" TEXT,
    "dealId" TEXT,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "dueAt" TIMESTAMP(3),
    "assignedTo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Campaign_slug_key" ON "Campaign"("slug");
CREATE UNIQUE INDEX "Lead_agencyLeadId_key" ON "Lead"("agencyLeadId");
CREATE INDEX "Campaign_status_createdAt_idx" ON "Campaign"("status", "createdAt");
CREATE INDEX "Campaign_vertical_status_idx" ON "Campaign"("vertical", "status");
CREATE INDEX "Company_name_idx" ON "Company"("name");
CREATE INDEX "Company_sector_city_idx" ON "Company"("sector", "city");
CREATE INDEX "Company_source_createdAt_idx" ON "Company"("source", "createdAt");
CREATE INDEX "Contact_companyId_idx" ON "Contact"("companyId");
CREATE INDEX "Contact_email_idx" ON "Contact"("email");
CREATE INDEX "Contact_phone_idx" ON "Contact"("phone");
CREATE INDEX "Lead_campaignId_status_idx" ON "Lead"("campaignId", "status");
CREATE INDEX "Lead_companyId_createdAt_idx" ON "Lead"("companyId", "createdAt");
CREATE INDEX "Lead_contactId_idx" ON "Lead"("contactId");
CREATE INDEX "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");
CREATE INDEX "Lead_priority_score_idx" ON "Lead"("priority", "score");
CREATE INDEX "Deal_campaignId_stage_idx" ON "Deal"("campaignId", "stage");
CREATE INDEX "Deal_companyId_status_idx" ON "Deal"("companyId", "status");
CREATE INDEX "Deal_leadId_idx" ON "Deal"("leadId");
CREATE INDEX "Deal_stage_status_idx" ON "Deal"("stage", "status");
CREATE INDEX "Activity_campaignId_createdAt_idx" ON "Activity"("campaignId", "createdAt");
CREATE INDEX "Activity_companyId_createdAt_idx" ON "Activity"("companyId", "createdAt");
CREATE INDEX "Activity_contactId_createdAt_idx" ON "Activity"("contactId", "createdAt");
CREATE INDEX "Activity_leadId_createdAt_idx" ON "Activity"("leadId", "createdAt");
CREATE INDEX "Activity_dealId_createdAt_idx" ON "Activity"("dealId", "createdAt");
CREATE INDEX "Activity_type_createdAt_idx" ON "Activity"("type", "createdAt");
CREATE INDEX "Task_campaignId_status_idx" ON "Task"("campaignId", "status");
CREATE INDEX "Task_companyId_status_idx" ON "Task"("companyId", "status");
CREATE INDEX "Task_contactId_status_idx" ON "Task"("contactId", "status");
CREATE INDEX "Task_leadId_status_idx" ON "Task"("leadId", "status");
CREATE INDEX "Task_dealId_status_idx" ON "Task"("dealId", "status");
CREATE INDEX "Task_status_dueAt_idx" ON "Task"("status", "dueAt");
CREATE INDEX "Task_priority_dueAt_idx" ON "Task"("priority", "dueAt");

ALTER TABLE "Contact" ADD CONSTRAINT "Contact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_agencyLeadId_fkey" FOREIGN KEY ("agencyLeadId") REFERENCES "AgencyLead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
