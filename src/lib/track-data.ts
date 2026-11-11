// ==========================================================================
// من Windows Server إلى الـ SOC
// بيانات المسار: الفيديوهات المسئولة عن مسار الأمن السيبراني و SOC فقط
// ==========================================================================

export type CourseId = "tanany2022" | "abeer2019";
export type LevelId = "basic" | "support" | "optional";

export interface Course {
  id: CourseId;
  short: string;
  full: string;
  color: string;
}

export interface Level {
  id: LevelId;
  name: string;
  color: string;
}

export interface TrackItem {
  title: string;
  course: CourseId;
  num: string;
  level: LevelId;
}

export interface Stage {
  id: number;
  title: string;
  subtitle: string;
  items: TrackItem[];
}

export const COURSES: Course[] = [
  { id: "tanany2022", short: "طناني 2022", full: "محمد طناني - Windows Server 2022", color: "#0ea5e9" },
  { id: "abeer2019", short: "عبير 2019", full: "عبير - Windows Server 2019", color: "#f59e0b" },
];

export const LEVELS: Level[] = [
  { id: "basic", name: "أساسي", color: "#22c55e" },
  { id: "support", name: "دعم", color: "#f59e0b" },
  { id: "optional", name: "اختياري", color: "#94a3b8" },
];

export const STAGES: Stage[] = [
  {
    id: 1,
    title: "أساسيات الشبكات",
    subtitle: "الأساس اللي لازم تفهمه قبل أي حاجة في الـ SOC",
    items: [
      { title: "Network Fundamentals", course: "tanany2022", num: "01", level: "support" },
      { title: "Network Topologies", course: "abeer2019", num: "1", level: "basic" },
      { title: "OSI and TCP-IP Part 1", course: "tanany2022", num: "02", level: "support" },
      { title: "OSI Model", course: "abeer2019", num: "2", level: "basic" },
      { title: "OSI and TCP-IP Part 2", course: "tanany2022", num: "03", level: "support" },
      { title: "Application Layer (Part 1)", course: "abeer2019", num: "3", level: "basic" },
      { title: "Application Layer (Part 2)", course: "abeer2019", num: "4", level: "basic" },
      { title: "Transport Layer", course: "abeer2019", num: "5", level: "basic" },
      { title: "IP Addressing-Classes", course: "tanany2022", num: "04", level: "basic" },
      { title: "IPv4", course: "abeer2019", num: "6", level: "basic" },
      { title: "Subnetting", course: "tanany2022", num: "05", level: "basic" },
      { title: "Fixed Subnetting", course: "abeer2019", num: "7", level: "basic" },
      { title: "Subnetting Short Way", course: "tanany2022", num: "06", level: "support" },
      { title: "VLSM Private IP + ARP", course: "abeer2019", num: "8", level: "basic" },
      { title: "Understanding IPv6", course: "tanany2022", num: "07", level: "basic" },
      { title: "IPv6", course: "abeer2019", num: "9", level: "basic" },
    ],
  },
  {
    id: 2,
    title: "تثبيت السيرفر",
    subtitle: "تجهيز بيئة التجربة + Server Core للأمان",
    items: [
      { title: "Windows Server 2022 Installation", course: "tanany2022", num: "08", level: "basic" },
      { title: "Windows Server Core Installation and Configuration", course: "abeer2019", num: "13", level: "basic" },
      { title: "Windows Server Core Installation", course: "tanany2022", num: "10", level: "support" },
    ],
  },
  {
    id: 3,
    title: "الإدارة عن بُعد",
    subtitle: "كل طرق الإدارة اللي لازم تراقبها في الـ SOC",
    items: [
      { title: "Remote Management Part 1", course: "tanany2022", num: "18", level: "basic" },
      { title: "WinRM and Remote Desktop", course: "abeer2019", num: "21", level: "basic" },
      { title: "Remote Management Part 2", course: "tanany2022", num: "19", level: "basic" },
      { title: "Server Manager and MMC", course: "abeer2019", num: "22", level: "support" },
      { title: "Windows Admin Center (WAC)", course: "abeer2019", num: "23", level: "support" },
      { title: "Remotely Administering Windows Server Core", course: "abeer2019", num: "24", level: "basic" },
      { title: "Create User Delegation and Custom Management Tool", course: "abeer2019", num: "25", level: "support" },
    ],
  },
  {
    id: 4,
    title: "Active Directory - التثبيت والـ DCs",
    subtitle: "قلب البنية التحتية وأهم هدف للهجمات",
    items: [
      { title: "Active Directory Installation Part 1", course: "tanany2022", num: "11", level: "basic" },
      { title: "Active Directory Installation", course: "abeer2019", num: "14", level: "basic" },
      { title: "Active Directory Installation Part 2", course: "tanany2022", num: "12", level: "basic" },
      { title: "Join Domain and Offline Join Domain", course: "tanany2022", num: "13", level: "basic" },
      { title: "Join Domain", course: "abeer2019", num: "15", level: "basic" },
      { title: "Offline Join Domain", course: "abeer2019", num: "16", level: "basic" },
      { title: "Raise Domain and Forest Function Level", course: "tanany2022", num: "15", level: "support" },
      { title: "AD Partition - ADC - Core ADC", course: "tanany2022", num: "20", level: "basic" },
      { title: "Active Directory Partitions and Additional DC", course: "abeer2019", num: "26", level: "basic" },
      { title: "Operations Masters - Transfer FSMO - Seize", course: "tanany2022", num: "21", level: "basic" },
      { title: "Operation Master Roles", course: "abeer2019", num: "27", level: "basic" },
      { title: "Demote ADC and Demote PDC", course: "tanany2022", num: "22", level: "basic" },
      { title: "Demote Domain Controller", course: "abeer2019", num: "28", level: "basic" },
      { title: "Install DC from Answer File - ADC using IFM", course: "tanany2022", num: "23", level: "support" },
      { title: "Install From Media (IFM)", course: "abeer2019", num: "30", level: "support" },
      { title: "Install DC Using Answer File", course: "abeer2019", num: "32", level: "support" },
      { title: "Read Only Domain Controller (RODC)", course: "tanany2022", num: "24", level: "basic" },
      { title: "Read-only Domain Controller (RODC)", course: "abeer2019", num: "29", level: "basic" },
      { title: "Domain Controller Upgrade 2016 to 2019", course: "abeer2019", num: "31", level: "optional" },
    ],
  },
  {
    id: 5,
    title: "المستخدمين والمجموعات",
    subtitle: "إدارة الهوية والـ Computer Accounts",
    items: [
      { title: "Create Domain User", course: "tanany2022", num: "14", level: "basic" },
      { title: "Create Domain Users", course: "abeer2019", num: "17", level: "basic" },
      { title: "Create a Group of Users - Automation", course: "tanany2022", num: "16", level: "support" },
      { title: "User Automation", course: "abeer2019", num: "18", level: "support" },
      { title: "Computer Account", course: "tanany2022", num: "17", level: "basic" },
      { title: "Computer Account", course: "abeer2019", num: "20", level: "basic" },
    ],
  },
  {
    id: 6,
    title: "DNS و DHCP",
    subtitle: "الخدمات اللي بتتحول لسلاح في يد المهاجم",
    items: [
      { title: "DHCP Part 1", course: "tanany2022", num: "32", level: "basic" },
      { title: "DHCP Server (Part 1)", course: "abeer2019", num: "41", level: "basic" },
      { title: "DHCP Part 2", course: "tanany2022", num: "33", level: "basic" },
      { title: "DHCP Fail-over (Part 2)", course: "abeer2019", num: "42", level: "basic" },
      { title: "DHCP Part 3", course: "tanany2022", num: "34", level: "support" },
      { title: "DNS Part 1", course: "tanany2022", num: "35", level: "basic" },
      { title: "DNS (Part 1)", course: "abeer2019", num: "43", level: "basic" },
      { title: "DNS Part 2", course: "tanany2022", num: "36", level: "basic" },
      { title: "DNS Part 2 (Zone Types)", course: "abeer2019", num: "44", level: "basic" },
      { title: "DNS Part 3", course: "tanany2022", num: "37", level: "basic" },
      { title: "DNS (Part 3)", course: "abeer2019", num: "45", level: "basic" },
    ],
  },
  {
    id: 7,
    title: "Tree Domain والـ Trust",
    subtitle: "فهم العلاقات بين الدومينات مهم لتتبع الحركة الجانبية",
    items: [
      { title: "Tree Domain and Child Domain", course: "tanany2022", num: "38", level: "support" },
      { title: "Configuring a New Domain Tree in an Existing Forest", course: "abeer2019", num: "47", level: "support" },
      { title: "Adding a Child Domain", course: "abeer2019", num: "48", level: "support" },
      { title: "AD Groups and Create New Trust", course: "tanany2022", num: "39", level: "basic" },
      { title: "Configuring Trust Relationships", course: "abeer2019", num: "49", level: "basic" },
      { title: "Active Directory Groups", course: "abeer2019", num: "50", level: "basic" },
    ],
  },
  {
    id: 8,
    title: "Group Policy",
    subtitle: "كل سياسات الأمان اللي بتحمي البيئة",
    items: [
      { title: "Group Policy Part 1", course: "tanany2022", num: "40", level: "basic" },
      { title: "Group Policy Essentials and Local GPO", course: "abeer2019", num: "51", level: "basic" },
      { title: "Group Policy Part 2", course: "tanany2022", num: "41", level: "basic" },
      { title: "Group Policy Central Store and Refresh", course: "abeer2019", num: "52", level: "basic" },
      { title: "Group Policy Part 3", course: "tanany2022", num: "42", level: "basic" },
      { title: "GPO Security + Fine Grained Password + Restricted Groups", course: "abeer2019", num: "53", level: "basic" },
      { title: "GPO Trust Relationships and Software Deployment", course: "abeer2019", num: "54", level: "support" },
      { title: "GPO Login Scripts and Preference and Software Restrictions", course: "abeer2019", num: "55", level: "support" },
    ],
  },
  {
    id: 9,
    title: "File Server والصلاحيات",
    subtitle: "التحكم في الوصول لفهم صلاحيات NTFS ومشاركة الملفات",
    items: [
      { title: "File Server Part 1 - NTFS Permissions", course: "tanany2022", num: "28", level: "basic" },
      { title: "Disk Management", course: "abeer2019", num: "33", level: "support" },
      { title: "NTFS Permissions", course: "abeer2019", num: "36", level: "basic" },
      { title: "File Server Part 2 - Sharing Permissions", course: "tanany2022", num: "29", level: "basic" },
      { title: "Sharing Permissions", course: "abeer2019", num: "37", level: "basic" },
      { title: "Map Network Drive and Offline Sharing", course: "abeer2019", num: "38", level: "support" },
    ],
  },
  {
    id: 10,
    title: "Replication والـ Backup",
    subtitle: "فهم التكرار والاسترجاع للاستجابة للحوادث",
    items: [
      { title: "Intra Replication", course: "tanany2022", num: "43", level: "basic" },
      { title: "Active Directory Intra-Site Replication", course: "abeer2019", num: "56", level: "basic" },
      { title: "Inter Replication", course: "tanany2022", num: "44", level: "basic" },
      { title: "Active Directory Inter Site Replication", course: "abeer2019", num: "57", level: "basic" },
      { title: "Windows Server Backup", course: "tanany2022", num: "45", level: "basic" },
      { title: "Shadow Copy and Data Backup", course: "abeer2019", num: "58", level: "basic" },
      { title: "Disaster Recovery: System State Backup", course: "abeer2019", num: "59", level: "basic" },
      { title: "Disaster Recovery: Recover a User Using LDAP", course: "abeer2019", num: "60", level: "basic" },
      { title: "Disaster Recovery: Bare Metal Backup", course: "abeer2019", num: "61", level: "basic" },
    ],
  },
  {
    id: 11,
    title: "الوصول البعيد و VPN",
    subtitle: "تأمين الاتصال عن بُعد ومراقبة جلسات VPN",
    items: [
      { title: "NAT Server", course: "tanany2022", num: "60", level: "basic" },
      { title: "NAT Server", course: "abeer2019", num: "86", level: "basic" },
      { title: "VPN Remote Access", course: "tanany2022", num: "61", level: "basic" },
      { title: "VPN Theory", course: "abeer2019", num: "87", level: "support" },
      { title: "Remote Access VPN", course: "abeer2019", num: "88", level: "basic" },
      { title: "VPN L2TP, VPN SSTP, CMAK", course: "tanany2022", num: "62", level: "basic" },
      { title: "CMAK (Connection Manager Administration Kit)", course: "abeer2019", num: "89", level: "support" },
      { title: "SSTP VPN", course: "abeer2019", num: "91", level: "basic" },
      { title: "Site to Site VPN", course: "tanany2022", num: "64", level: "basic" },
      { title: "Site to Site VPN", course: "abeer2019", num: "93", level: "basic" },
      { title: "Routing using Windows Server", course: "abeer2019", num: "92", level: "support" },
    ],
  },
  {
    id: 12,
    title: "RADIUS و Hyper-V",
    subtitle: "مصادقة مركزية + بيئة اللاب العملي",
    items: [
      { title: "RADIUS Server (NPS)", course: "tanany2022", num: "63", level: "basic" },
      { title: "NPS Server (RADIUS Server)", course: "abeer2019", num: "90", level: "basic" },
      { title: "Hyper-V Part 1", course: "tanany2022", num: "53", level: "basic" },
      { title: "Hyper-V Part 2", course: "tanany2022", num: "54", level: "basic" },
      { title: "Hyper-V Server", course: "abeer2019", num: "68", level: "basic" },
    ],
  },
];

// ==========================================================================
// مسار WINDOWS SERVER الكامل - كل الفيديوهات بدون حذف
// ==========================================================================

export const FULL_STAGES: Stage[] = [
  {
    id: 1,
    title: "أساسيات الشبكات",
    subtitle: "كل أساسيات الشبكات من القائمتين",
    items: [
      { title: "Network Fundamentals", course: "tanany2022", num: "01", level: "support" },
      { title: "Orientation", course: "abeer2019", num: "0", level: "support" },
      { title: "Network Topologies", course: "abeer2019", num: "1", level: "basic" },
      { title: "OSI and TCP-IP Part 1", course: "tanany2022", num: "02", level: "support" },
      { title: "OSI Model", course: "abeer2019", num: "2", level: "basic" },
      { title: "OSI and TCP-IP Part 2", course: "tanany2022", num: "03", level: "support" },
      { title: "Application Layer (Part 1)", course: "abeer2019", num: "3", level: "basic" },
      { title: "Application Layer (Part 2)", course: "abeer2019", num: "4", level: "basic" },
      { title: "Transport Layer", course: "abeer2019", num: "5", level: "basic" },
      { title: "IP Addressing-Classes", course: "tanany2022", num: "04", level: "basic" },
      { title: "IPv4", course: "abeer2019", num: "6", level: "basic" },
      { title: "Subnetting", course: "tanany2022", num: "05", level: "basic" },
      { title: "Fixed Subnetting", course: "abeer2019", num: "7", level: "basic" },
      { title: "Subnetting Short Way", course: "tanany2022", num: "06", level: "support" },
      { title: "VLSM Private IP + ARP", course: "abeer2019", num: "8", level: "basic" },
      { title: "Understanding IPv6", course: "tanany2022", num: "07", level: "basic" },
      { title: "IPv6", course: "abeer2019", num: "9", level: "basic" },
      { title: "Cables", course: "abeer2019", num: "10", level: "optional" },
    ],
  },
  {
    id: 2,
    title: "تثبيت السيرفر والأنظمة",
    subtitle: "تثبيت Windows Server و Windows Desktop و Core",
    items: [
      { title: "Windows Server 2022 Installation", course: "tanany2022", num: "08", level: "basic" },
      { title: "Windows 11 Installation", course: "tanany2022", num: "09", level: "optional" },
      { title: "Windows 10 Installation", course: "abeer2019", num: "12", level: "optional" },
      { title: "Windows Server Core Installation", course: "tanany2022", num: "10", level: "basic" },
      { title: "Windows Server Core Installation and Configuration", course: "abeer2019", num: "13", level: "basic" },
    ],
  },
  {
    id: 3,
    title: "الإدارة عن بُعد",
    subtitle: "كل طرق الإدارة عن بُعد",
    items: [
      { title: "Remote Management Part 1", course: "tanany2022", num: "18", level: "basic" },
      { title: "WinRM and Remote Desktop", course: "abeer2019", num: "21", level: "basic" },
      { title: "Remote Management Part 2", course: "tanany2022", num: "19", level: "basic" },
      { title: "Server Manager and MMC", course: "abeer2019", num: "22", level: "support" },
      { title: "Windows Admin Center (WAC)", course: "abeer2019", num: "23", level: "support" },
      { title: "Remotely Administering Windows Server Core", course: "abeer2019", num: "24", level: "basic" },
      { title: "Create User Delegation and Custom Management Tool", course: "abeer2019", num: "25", level: "support" },
    ],
  },
  {
    id: 4,
    title: "Active Directory - التثبيت والـ DCs",
    subtitle: "كل ما يخص تثبيت Domain Controllers وإدارتها",
    items: [
      { title: "Active Directory Installation Part 1", course: "tanany2022", num: "11", level: "basic" },
      { title: "Active Directory Installation", course: "abeer2019", num: "14", level: "basic" },
      { title: "Active Directory Installation Part 2", course: "tanany2022", num: "12", level: "basic" },
      { title: "Join Domain and Offline Join Domain", course: "tanany2022", num: "13", level: "basic" },
      { title: "Join Domain", course: "abeer2019", num: "15", level: "basic" },
      { title: "Offline Join Domain", course: "abeer2019", num: "16", level: "basic" },
      { title: "Raise Domain and Forest Function Level", course: "tanany2022", num: "15", level: "support" },
      { title: "AD Partition - ADC - Core ADC", course: "tanany2022", num: "20", level: "basic" },
      { title: "Active Directory Partitions and Additional DC", course: "abeer2019", num: "26", level: "basic" },
      { title: "Operations Masters - Transfer FSMO - Seize", course: "tanany2022", num: "21", level: "basic" },
      { title: "Operation Master Roles", course: "abeer2019", num: "27", level: "basic" },
      { title: "Demote ADC and Demote PDC", course: "tanany2022", num: "22", level: "basic" },
      { title: "Demote Domain Controller", course: "abeer2019", num: "28", level: "basic" },
      { title: "Install DC from Answer File - ADC using IFM", course: "tanany2022", num: "23", level: "support" },
      { title: "Install From Media (IFM)", course: "abeer2019", num: "30", level: "support" },
      { title: "Install DC Using Answer File", course: "abeer2019", num: "32", level: "support" },
      { title: "Read Only Domain Controller (RODC)", course: "tanany2022", num: "24", level: "basic" },
      { title: "Read-only Domain Controller (RODC)", course: "abeer2019", num: "29", level: "basic" },
      { title: "Domain Controller Upgrade 2016 to 2019", course: "abeer2019", num: "31", level: "optional" },
      { title: "Revision on Active Directory", course: "abeer2019", num: "46", level: "optional" },
    ],
  },
  {
    id: 5,
    title: "المستخدمين والمجموعات",
    subtitle: "إدارة الهوية والـ Computer Accounts",
    items: [
      { title: "Create Domain User", course: "tanany2022", num: "14", level: "basic" },
      { title: "Create Domain Users", course: "abeer2019", num: "17", level: "basic" },
      { title: "Create a Group of Users - Automation", course: "tanany2022", num: "16", level: "support" },
      { title: "User Automation", course: "abeer2019", num: "18", level: "support" },
      { title: "Computer Account", course: "tanany2022", num: "17", level: "basic" },
      { title: "Computer Account", course: "abeer2019", num: "20", level: "basic" },
    ],
  },
  {
    id: 6,
    title: "التخزين وإدارة الأقراص",
    subtitle: "Disk Management و Storage Spaces و iSCSI",
    items: [
      { title: "Basic Hard Disk MBR and GPT", course: "tanany2022", num: "25", level: "basic" },
      { title: "Disk Management", course: "abeer2019", num: "33", level: "basic" },
      { title: "Dynamic Disk Volumes types", course: "tanany2022", num: "26", level: "support" },
      { title: "Storage Pool", course: "tanany2022", num: "27", level: "support" },
      { title: "Storage Space", course: "abeer2019", num: "34", level: "support" },
      { title: "Storage Tier", course: "abeer2019", num: "35", level: "optional" },
      { title: "iSCSI", course: "abeer2019", num: "40", level: "support" },
    ],
  },
  {
    id: 7,
    title: "File Server والصلاحيات",
    subtitle: "NTFS و Sharing و NFS و Data Deduplication",
    items: [
      { title: "File Server Part 1 - NTFS Permissions", course: "tanany2022", num: "28", level: "basic" },
      { title: "NTFS Permissions", course: "abeer2019", num: "36", level: "basic" },
      { title: "File Server Part 2 - Sharing Permissions", course: "tanany2022", num: "29", level: "basic" },
      { title: "Sharing Permissions", course: "abeer2019", num: "37", level: "basic" },
      { title: "Map Network Drive and Offline Sharing", course: "abeer2019", num: "38", level: "support" },
      { title: "File Server Part 3 - NFS Share", course: "tanany2022", num: "30", level: "optional" },
      { title: "Data Deduplication", course: "tanany2022", num: "31", level: "support" },
      { title: "Data Deduplication", course: "abeer2019", num: "39", level: "support" },
    ],
  },
  {
    id: 8,
    title: "DNS و DHCP",
    subtitle: "كل أجزاء DNS و DHCP",
    items: [
      { title: "DHCP Part 1", course: "tanany2022", num: "32", level: "basic" },
      { title: "DHCP Server (Part 1)", course: "abeer2019", num: "41", level: "basic" },
      { title: "DHCP Part 2", course: "tanany2022", num: "33", level: "basic" },
      { title: "DHCP Fail-over (Part 2)", course: "abeer2019", num: "42", level: "basic" },
      { title: "DHCP Part 3", course: "tanany2022", num: "34", level: "support" },
      { title: "DNS Part 1", course: "tanany2022", num: "35", level: "basic" },
      { title: "DNS (Part 1)", course: "abeer2019", num: "43", level: "basic" },
      { title: "DNS Part 2", course: "tanany2022", num: "36", level: "basic" },
      { title: "DNS Part 2 (Zone Types)", course: "abeer2019", num: "44", level: "basic" },
      { title: "DNS Part 3", course: "tanany2022", num: "37", level: "basic" },
      { title: "DNS (Part 3)", course: "abeer2019", num: "45", level: "basic" },
    ],
  },
  {
    id: 9,
    title: "Tree Domain والـ Trust",
    subtitle: "Domain Tree و Child Domain و Trust Relationships",
    items: [
      { title: "Tree Domain and Child Domain", course: "tanany2022", num: "38", level: "support" },
      { title: "Configuring a New Domain Tree in an Existing Forest", course: "abeer2019", num: "47", level: "support" },
      { title: "Adding a Child Domain", course: "abeer2019", num: "48", level: "support" },
      { title: "AD Groups and Create New Trust", course: "tanany2022", num: "39", level: "basic" },
      { title: "Configuring Trust Relationships", course: "abeer2019", num: "49", level: "basic" },
      { title: "Active Directory Groups", course: "abeer2019", num: "50", level: "basic" },
    ],
  },
  {
    id: 10,
    title: "Group Policy",
    subtitle: "كل ما يخص Group Policy",
    items: [
      { title: "Group Policy Part 1", course: "tanany2022", num: "40", level: "basic" },
      { title: "Group Policy Essentials and Local GPO", course: "abeer2019", num: "51", level: "basic" },
      { title: "Group Policy Part 2", course: "tanany2022", num: "41", level: "basic" },
      { title: "Group Policy Central Store and Refresh", course: "abeer2019", num: "52", level: "basic" },
      { title: "Group Policy Part 3", course: "tanany2022", num: "42", level: "basic" },
      { title: "GPO Security + Fine Grained Password + Restricted Groups", course: "abeer2019", num: "53", level: "basic" },
      { title: "GPO Trust Relationships and Software Deployment", course: "abeer2019", num: "54", level: "support" },
      { title: "GPO Login Scripts and Preference and Software Restrictions", course: "abeer2019", num: "55", level: "support" },
    ],
  },
  {
    id: 11,
    title: "Replication والـ Backup",
    subtitle: "AD Replication و Disaster Recovery كامل",
    items: [
      { title: "Intra Replication", course: "tanany2022", num: "43", level: "basic" },
      { title: "Active Directory Intra-Site Replication", course: "abeer2019", num: "56", level: "basic" },
      { title: "Inter Replication", course: "tanany2022", num: "44", level: "basic" },
      { title: "Active Directory Inter Site Replication", course: "abeer2019", num: "57", level: "basic" },
      { title: "Windows Server Backup", course: "tanany2022", num: "45", level: "basic" },
      { title: "Shadow Copy and Data Backup", course: "abeer2019", num: "58", level: "basic" },
      { title: "Disaster Recovery: System State Backup", course: "abeer2019", num: "59", level: "basic" },
      { title: "Disaster Recovery: Recover a User Using LDAP", course: "abeer2019", num: "60", level: "basic" },
      { title: "Disaster Recovery: Bare Metal Backup", course: "abeer2019", num: "61", level: "basic" },
    ],
  },
  {
    id: 12,
    title: "WDS و MDT",
    subtitle: "Windows Deployment Services و Microsoft Deployment Toolkit",
    items: [
      { title: "WDS Part 1", course: "tanany2022", num: "46", level: "basic" },
      { title: "Windows Deployment Server WDS (Part 1)", course: "abeer2019", num: "62", level: "basic" },
      { title: "WDS Part 2", course: "tanany2022", num: "47", level: "basic" },
      { title: "Windows Deployment Server WDS (Part 2)", course: "abeer2019", num: "63", level: "basic" },
      { title: "Windows Deployment Server WDS (Part 3)", course: "abeer2019", num: "64", level: "basic" },
      { title: "Windows Deployment Server WDS (Part 4) Reference Image", course: "abeer2019", num: "65", level: "support" },
      { title: "MDT Part 1", course: "tanany2022", num: "48", level: "basic" },
      { title: "Microsoft Deployment Toolkit MDT (Part 1)", course: "abeer2019", num: "66", level: "basic" },
      { title: "MDT Part 2", course: "tanany2022", num: "49", level: "basic" },
      { title: "Microsoft Deployment Toolkit MDT (Part 2)", course: "abeer2019", num: "67", level: "basic" },
      { title: "MDT Part 3", course: "tanany2022", num: "50", level: "basic" },
    ],
  },
  {
    id: 13,
    title: "Hyper-V والـ Clustering",
    subtitle: "Hyper-V و NLB و Failover Cluster و iSCSI",
    items: [
      { title: "Hyper-V Part 1", course: "tanany2022", num: "53", level: "basic" },
      { title: "Hyper-V Part 2", course: "tanany2022", num: "54", level: "basic" },
      { title: "Hyper-V Server", course: "abeer2019", num: "68", level: "basic" },
      { title: "Network Load Balancing (NLB)", course: "tanany2022", num: "55", level: "support" },
      { title: "NLB (Network Load Balance)", course: "abeer2019", num: "70", level: "support" },
      { title: "iSCSI", course: "tanany2022", num: "56", level: "support" },
      { title: "Fail-over Cluster - File Server", course: "tanany2022", num: "57", level: "support" },
      { title: "Failover Cluster", course: "abeer2019", num: "71", level: "support" },
      { title: "Failover Cluster with Hyper-V", course: "tanany2022", num: "58", level: "support" },
      { title: "Hyper-V Replication using Failover Cluster", course: "abeer2019", num: "72", level: "support" },
    ],
  },
  {
    id: 14,
    title: "IIS و FTP و WSUS",
    subtitle: "Web Server و Patch Management",
    items: [
      { title: "IIS and FTP", course: "tanany2022", num: "51", level: "support" },
      { title: "IIS and FTP Services", course: "abeer2019", num: "69", level: "support" },
      { title: "WSUS", course: "tanany2022", num: "52", level: "support" },
      { title: "WSUS Server", course: "abeer2019", num: "73", level: "support" },
      { title: "WSUS Using SSL", course: "abeer2019", num: "74", level: "optional" },
    ],
  },
  {
    id: 15,
    title: "FSRM و DAC و DFS",
    subtitle: "File Server Resource Manager و Dynamic Access Control و DFS",
    items: [
      { title: "DFS Name Space and Replication", course: "tanany2022", num: "59", level: "support" },
      { title: "DFS Name Space", course: "abeer2019", num: "83", level: "support" },
      { title: "DFS Replication", course: "abeer2019", num: "84", level: "support" },
      { title: "FSRM (Part 1) Quota", course: "abeer2019", num: "75", level: "support" },
      { title: "FSRM (Part 2) File Screening and Storage Reports", course: "abeer2019", num: "76", level: "support" },
      { title: "FSRM (Part 3) Classification", course: "abeer2019", num: "77", level: "support" },
      { title: "FSRM (Part 4) Access Denied Assistance and File Management Tasks", course: "abeer2019", num: "78", level: "support" },
      { title: "Dynamic Access Control (DAC)", course: "abeer2019", num: "79", level: "support" },
      { title: "Branch Cache", course: "abeer2019", num: "80", level: "optional" },
      { title: "Work Folders", course: "abeer2019", num: "81", level: "optional" },
      { title: "Print Servers", course: "abeer2019", num: "82", level: "optional" },
    ],
  },
  {
    id: 16,
    title: "الوصول البعيد و VPN",
    subtitle: "NAT و VPN و RADIUS و Routing",
    items: [
      { title: "NAT Server", course: "tanany2022", num: "60", level: "basic" },
      { title: "NAT Server", course: "abeer2019", num: "86", level: "basic" },
      { title: "VPN Remote Access", course: "tanany2022", num: "61", level: "basic" },
      { title: "VPN Theory", course: "abeer2019", num: "87", level: "support" },
      { title: "Remote Access VPN", course: "abeer2019", num: "88", level: "basic" },
      { title: "VPN L2TP, VPN SSTP, CMAK", course: "tanany2022", num: "62", level: "basic" },
      { title: "CMAK (Connection Manager Administration Kit)", course: "abeer2019", num: "89", level: "support" },
      { title: "SSTP VPN", course: "abeer2019", num: "91", level: "basic" },
      { title: "RADIUS Server (NPS)", course: "tanany2022", num: "63", level: "basic" },
      { title: "NPS Server (RADIUS Server)", course: "abeer2019", num: "90", level: "basic" },
      { title: "Site to Site VPN", course: "tanany2022", num: "64", level: "basic" },
      { title: "Site to Site VPN", course: "abeer2019", num: "93", level: "basic" },
      { title: "Routing using Windows Server", course: "abeer2019", num: "92", level: "support" },
    ],
  },
  {
    id: 17,
    title: "IPAM و NIC Teaming",
    subtitle: "إدارة عناوين IP و تجميع كروت الشبكة",
    items: [
      { title: "IPAM Server", course: "abeer2019", num: "94", level: "optional" },
      { title: "NIC Teaming", course: "abeer2019", num: "95", level: "optional" },
    ],
  },
];

export const EXCLUDED_TOPICS: string[] = [
  "Windows 11 / Windows 10 Installation",
  "Basic Hard Disk MBR and GPT",
  "Dynamic Disk Volumes types",
  "Storage Pool / Storage Space / Storage Tier",
  "Data Deduplication",
  "File Server NFS Share",
  "WDS (All Parts)",
  "MDT (All Parts)",
  "IIS and FTP",
  "WSUS / WSUS Using SSL",
  "Network Load Balancing (NLB)",
  "iSCSI",
  "Failover Cluster (File Server / Hyper-V)",
  "DFS Name Space and Replication",
  "FSRM (All Parts)",
  "Dynamic Access Control (DAC)",
  "Branch Cache",
  "Work Folders",
  "Print Servers",
  "IPAM Server",
  "NIC Teaming",
  "Cables",
  "Orientation",
];

export const SOC_PLAN: { month: string; goal: string }[] = [
  { month: "1–2", goal: "المراحل 1–3 + أساسيات Windows Event Logs و PowerShell" },
  { month: "3–4", goal: "المراحل 4–7 + فهم Active Directory Attacks (Kerberoasting، Pass-the-Hash)" },
  { month: "5", goal: "المراحل 8–10 + Wireshark و تحليل DNS و SMB و Kerberos traffic" },
  { month: "6", goal: "CompTIA Security+ (أو منهجه) + MITRE ATT&CK Framework" },
  { month: "7–8", goal: "SIEM: Splunk أو Wazuh/ELK + مسار TryHackMe SOC Level 1" },
  { month: "9–10", goal: "تحليل التصيد (Phishing) والاستجابة للحوادث + معامل Blue Team" },
  { month: "11–12", goal: "شهادة BTL1 أو CySA+ ثم التقديم على وظائف SOC Tier 1" },
];
