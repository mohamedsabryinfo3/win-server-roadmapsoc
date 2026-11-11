# من Windows Server إلى الـ SOC + مسار Windows Server الكامل

موقع فيه مسارين من قوائم **محمد طناني (Windows Server 2022)** و**عبير (Windows Server 2019)**:

1. **مسار SOC** — الفيديوهات المسئولة عن مسار الأمن السيبراني و SOC فقط (107 فيديو)
2. **مسار WINDOWS SERVER** — كل الفيديوهات بدون حذف (157 فيديو)

> مبني بـ Next.js 16 + TypeScript + Tailwind CSS.

## المميزات

- **مبدّل مسارات** في أعلى الصفحة للتبديل بين مسار SOC والمسار الكامل
- كل فيديو له **بديل أو مكمل** من القائمة التانية (طناني 2022 / عبير 2019)
- **تتبع التقدم** محلياً في المتصفح (localStorage) — منفصل لكل مسار
- **فلاتر** بالنوع (أساسي / دعم / اختياري) والقائمة
- إخفاء المنتهي + تصفير التقدم + تصدير/استيراد التقدم
- تصميم RTL عربي متجاوب dark theme
- خطوط Cairo + Tajawal + Inter

## بنية المشروع

```
src/
├── app/
│   ├── layout.tsx     # RTL + خطوط Cairo/Tajawal/Inter
│   ├── page.tsx       # الصفحة الرئيسية + كل المنطق (مبدّل المسارات، الفلاتر، التقدم)
│   └── globals.css    # Tailwind
└── lib/
    └── track-data.ts  # بيانات الفيديوهات والمراحل للمسارين
```

## مسار SOC (12 مرحلة، 107 فيديو)

| # | المرحلة | عدد الفيديوهات |
|---|---------|---------------|
| 1 | أساسيات الشبكات | 16 |
| 2 | تثبيت السيرفر | 3 |
| 3 | الإدارة عن بُعد | 7 |
| 4 | Active Directory - DCs | 19 |
| 5 | المستخدمين والمجموعات | 6 |
| 6 | DNS و DHCP | 11 |
| 7 | Tree Domain والـ Trust | 6 |
| 8 | Group Policy | 8 |
| 9 | File Server والصلاحيات | 6 |
| 10 | Replication والـ Backup | 9 |
| 11 | الوصول البعيد و VPN | 11 |
| 12 | RADIUS و Hyper-V | 5 |

## مسار WINDOWS SERVER الكامل (17 مرحلة، 157 فيديو)

| # | المرحلة | المحتوى |
|---|---------|---------|
| 1 | أساسيات الشبكات | OSI, TCP/IP, IPv4, Subnetting, IPv6, Cables |
| 2 | تثبيت السيرفر والأنظمة | Windows Server + Core + Windows 10/11 |
| 3 | الإدارة عن بُعد | WinRM, RDP, WAC, MMC |
| 4 | Active Directory - DCs | AD Installation, FSMO, RODC, IFM |
| 5 | المستخدمين والمجموعات | Users, Groups, Computer Accounts |
| 6 | التخزين وإدارة الأقراص | Disk Management, Storage Spaces, iSCSI |
| 7 | File Server والصلاحيات | NTFS, Sharing, NFS, Data Deduplication |
| 8 | DNS و DHCP | كل الأجزاء |
| 9 | Tree Domain والـ Trust | Domains, Trust, Groups |
| 10 | Group Policy | GPO كامل |
| 11 | Replication والـ Backup | Intra/Inter, Disaster Recovery |
| 12 | WDS و MDT | Windows Deployment Services + MDT |
| 13 | Hyper-V والـ Clustering | Hyper-V, NLB, Failover Cluster |
| 14 | IIS و FTP و WSUS | Web Server + Patch Management |
| 15 | FSRM و DAC و DFS | File Server Resource Manager |
| 16 | الوصول البعيد و VPN | NAT, VPN, RADIUS, Routing |
| 17 | IPAM و NIC Teaming | إدارة IP + تجميع كروت الشبكة |

## التشغيل محلياً

```bash
npm install      # أو bun install
npm run dev      # أو bun run dev
# افتح http://localhost:3000
```

## النشر على Vercel

1. ارفع المشروع على GitHub
2. من Vercel: **New Project** → اختار الريبو
3. Vercel هيعرف إنه Next.js تلقائياً، اضغط **Deploy**

أو من سطر الأوامر:

```bash
npm i -g vercel
vercel
```

## الترخيص

محتوى المسار (الفيديوهات) ملك لأصحابها (محمد طناني وعبير). الكود مفتوح المصدر للاستخدام التعليمي.
