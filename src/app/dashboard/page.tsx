"use client";
import BarsDataset from "@/components/chart/chart";
import { IconType } from "react-icons";
import { CgGoogle, CgVercel } from "react-icons/cg";
import { FaListCheck, FaUsers } from "react-icons/fa6";
import { MdAddAlert } from "react-icons/md";
interface StatCardProps {
  Icon: IconType;
  title: string;
  value: number;
  change: {
    value: number;
    type: string;
  };
}

export const StatCard = ({ Icon, title, value, change }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Icon />
        <div>
          <h3 className="text-sm text-gray-600">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
      </div>
      <div
        className={`mt-4 text-sm ${
          change.type === "increase" ? "text-green-500" : "text-red-500"
        }`}
      >
        {change.type === "increase" ? "+" : "-"}
        {change.value}% vs last month
      </div>
    </div>
  );
};

interface UsageData {
  month: string;
  currentYear: number;
  previousYear: number;
}

interface UsageChartProps {
  data: UsageData[];
  increase: {
    percentage: number;
    products: number;
  };
}

export const UsageChart = ({ data, increase }: UsageChartProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Commandes en ligne</h2>
        <div className="mt-2">
          <span className="text-3xl text-green-500 font-bold">
            +{increase.percentage}%
          </span>
          <p className="text-gray-600 mt-1">
            Commande passe depuis ce site
            <span className="font-semibold">
              {" "}
              {increase.products.toLocaleString()}{" "}
            </span>
          </p>
        </div>
      </div>
      <div className="h-fit">
        <BarsDataset />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span className="text-sm text-gray-600">This year</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-300 rounded"></div>
          <span className="text-sm text-gray-600">Last year</span>
        </div>
      </div>
    </div>
  );
};

// components/SubscriptionCard.tsx
interface Subscription {
  name: string;
  logo: IconType;
  price: {
    amount: number;
    period: string;
    // period: "month" | "year";
  };
  status: string;
  // status: "Paid" | "Expiring" | "Cancelled";
}

interface SubscriptionCardProps {
  subscriptions: Subscription[];
}

export const SubscriptionCard = ({ subscriptions }: SubscriptionCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Nos abonnement</h2>
      </div>
      <div className="space-y-4">
        {subscriptions.map((sub, index) => (
          <div key={index} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="border p-2.5 rounded-full border-black">
                <sub.logo size={20} />
              </span>
              <div>
                <p className="font-medium">{sub.name}</p>
                <p className="text-sm text-gray-600">
                  ${sub.price.amount}/{sub.price.period}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  sub.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : sub.status === "Expiring"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {sub.status}
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="text-xl">⋯</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2">
        See all subscriptions
        <span>→</span>
      </button>
    </div>
  );
};

export const Dashboard = () => {
  const stats = [
    {
      Icon: FaListCheck,
      title: "Tickets",
      value: 31,
      change: { value: 15, type: "increase" },
    },
    {
      Icon: FaUsers,
      title: "Sign ups",
      value: 240,
      change: { value: 5, type: "decrease" },
    },
    {
      Icon: MdAddAlert,
      title: "Open issues",
      value: 21,
      change: { value: 12, type: "increase" },
    },
  ];

  const subscriptions = [
    {
      name: "Google",
      logo: CgGoogle,
      price: { amount: 599, period: "year" },
      status: "Paid",
    },
    {
      name: "Vercel",
      logo: CgVercel,
      price: { amount: 20, period: "month" },
      status: "Expiring",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 h-screen w-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <UsageChart data={[]} increase={{ percentage: 28, products: 6521 }} />
        </div>
        <div>
          <SubscriptionCard subscriptions={subscriptions} />
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardLayout;
