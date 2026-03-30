import { useState, useEffect } from "react";
import { Building2, Mail, Phone, Globe, MapPin, Save } from "lucide-react";
import { getCompanyDetails, updateCompanyDetails } from "../../services/company";

export default function CompanySettings() {
  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    address: "",
    baseCurrency: "NGN",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompanyDetails();
        if (data.success) {
          setCompany(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch company details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await updateCompanyDetails(company);
      if (res.success) {
        setMessage({ type: "success", text: "Company details updated successfully!" });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to update company details" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading company details...</div>;
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
        <p className="text-gray-500 font-medium">Manage your organization's profile and preferences</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${
          message.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Building2 size={14} /> Company Name
              </label>
              <input
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none transition-all font-medium text-gray-900"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Mail size={14} /> Company Email
              </label>
              <input
                type="email"
                name="email"
                value={company.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none transition-all font-medium text-gray-900"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Phone size={14} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={company.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none transition-all font-medium text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Globe size={14} /> Industry
              </label>
              <select
                name="industry"
                value={company.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer"
              >
                <option value="">Select industry</option>
                <option value="software">Tech</option>
                <option value="banking">Banking</option>
                <option value="construction">Construction</option>
                <option value="manufacturer">Manufacturer</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} /> Address
              </label>
              <textarea
                name="address"
                value={company.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none transition-all font-medium text-gray-900 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base Currency</label>
              <select
                name="baseCurrency"
                value={company.baseCurrency}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer"
              >
                <option value="NGN">NGN (Nigerian Naira)</option>
                <option value="USD">USD (US Dollar)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#1D4EFF] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 active:scale-95"
          >
            {saving ? "Saving..." : <><Save size={18} /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
}
