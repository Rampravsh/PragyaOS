import React from "react";
import { CheckIcon } from "@pragyaos/icons";

interface FeatureRow {
  name: string;
  starter: string | boolean;
  pro: string | boolean;
  team: string | boolean;
  enterprise: string | boolean;
}

interface FeatureSection {
  groupName: string;
  rows: FeatureRow[];
}

const COMPARISON_DATA: FeatureSection[] = [
  {
    groupName: "AI Learning Capabilities",
    rows: [
      {
        name: "AI Tutor Support",
        starter: "Limited",
        pro: "Unlimited",
        team: "Unlimited",
        enterprise: "Custom Models",
      },
      { name: "Personalized Study Paths", starter: false, pro: true, team: true, enterprise: true },
      {
        name: "Interactive Quiz Generator",
        starter: "3/month",
        pro: "Unlimited",
        team: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Instant Homework Feedback",
        starter: "2/day",
        pro: "Unlimited",
        team: "Unlimited",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    groupName: "Courses & Content",
    rows: [
      {
        name: "Active Course Enrolments",
        starter: "2 Courses",
        pro: "Unlimited",
        team: "Unlimited",
        enterprise: "Unlimited",
      },
      { name: "Editorial Learning Player", starter: true, pro: true, team: true, enterprise: true },
      { name: "Notes & Annotations", starter: true, pro: true, team: true, enterprise: true },
      { name: "Verifiable Certificates", starter: false, pro: true, team: true, enterprise: true },
    ],
  },
  {
    groupName: "Collaboration & Management",
    rows: [
      {
        name: "Public Study Groups",
        starter: "Join Only",
        pro: "Create & Join",
        team: "Create & Join",
        enterprise: "Create & Join",
      },
      {
        name: "Team Cohort Analytics",
        starter: false,
        pro: false,
        team: "Basic Dashboard",
        enterprise: "Advanced BI",
      },
      { name: "Compliance Audit Logs", starter: false, pro: false, team: false, enterprise: true },
      {
        name: "Single Sign-On (SSO / SAML)",
        starter: false,
        pro: false,
        team: false,
        enterprise: true,
      },
    ],
  },
  {
    groupName: "SLA & Support",
    rows: [
      { name: "Email & Community Support", starter: true, pro: true, team: true, enterprise: true },
      {
        name: "Priority SLA Support",
        starter: false,
        pro: "24 Hours",
        team: "12 Hours",
        enterprise: "1 Hour Guaranteed",
      },
      {
        name: "Dedicated Success Manager",
        starter: false,
        pro: false,
        team: false,
        enterprise: true,
      },
    ],
  },
];

export function ComparisonTable(): React.JSX.Element {
  const renderCell = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <CheckIcon size={16} className="text-brand-gold mx-auto" />
      ) : (
        <span className="text-stone-300 dark:text-stone-850 font-sans">&mdash;</span>
      );
    }
    return <span className="font-sans text-xs text-stone-700 dark:text-stone-300">{val}</span>;
  };

  return (
    <section className="py-16 bg-background/50 border-b border-stone-200/50 dark:border-stone-850">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-stone-900 dark:text-white mb-4">
            Compare plans in detail
          </h2>
          <p className="font-sans text-stone-500 dark:text-stone-400 text-sm">
            Review the breakdown of features and SLA parameters to find the tier that best fits your
            workflow.
          </p>
        </div>

        {/* Responsive Table Card */}
        <div className="bg-white dark:bg-stone-950 border-2 border-stone-850 dark:border-stone-800 rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[768px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-stone-850 dark:border-stone-800 bg-muted">
                  <th className="sticky left-0 z-20 bg-muted p-4 font-sans font-bold text-xs uppercase tracking-wider text-stone-800 dark:text-stone-200 w-1/3 border-r border-stone-200 dark:border-stone-800">
                    Features
                  </th>
                  <th className="p-4 text-center font-sans font-bold text-xs uppercase tracking-wider text-stone-800 dark:text-stone-200">
                    Starter
                  </th>
                  <th className="p-4 text-center font-sans font-bold text-xs uppercase tracking-wider text-stone-800 dark:text-stone-200 bg-brand-gold/5 dark:bg-brand-gold/5">
                    Pro
                  </th>
                  <th className="p-4 text-center font-sans font-bold text-xs uppercase tracking-wider text-stone-800 dark:text-stone-200">
                    Team
                  </th>
                  <th className="p-4 text-center font-sans font-bold text-xs uppercase tracking-wider text-stone-800 dark:text-stone-200">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((section, sIdx) => (
                  <React.Fragment key={sIdx}>
                    {/* Category Group Header Row */}
                    <tr className="bg-stone-50 dark:bg-stone-900/20 border-b border-stone-200 dark:border-stone-800/80">
                      <td
                        colSpan={5}
                        className="sticky left-0 z-10 bg-stone-50 dark:bg-stone-900/20 px-4 py-2.5 font-sans font-bold text-[10px] uppercase tracking-widest text-brand-gold border-r border-stone-200 dark:border-stone-800"
                      >
                        {section.groupName}
                      </td>
                    </tr>

                    {/* Feature Row List */}
                    {section.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="border-b border-stone-150 dark:border-stone-800/60 hover:bg-stone-50/40 dark:hover:bg-stone-900/10 transition-colors"
                      >
                        <td className="sticky left-0 z-10 bg-white dark:bg-stone-950 p-4 font-sans font-medium text-xs text-stone-850 dark:text-stone-250 border-r border-stone-150 dark:border-stone-800/60">
                          {row.name}
                        </td>
                        <td className="p-4 text-center">{renderCell(row.starter)}</td>
                        <td className="p-4 text-center bg-brand-gold/5 dark:bg-brand-gold/5">
                          {renderCell(row.pro)}
                        </td>
                        <td className="p-4 text-center">{renderCell(row.team)}</td>
                        <td className="p-4 text-center">{renderCell(row.enterprise)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComparisonTable;
