import React, { useState } from 'react';
import { 
  X, 
  Eye, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  Download, 
  Printer,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { EyePledgeRecord } from '../../types';

export const EyePledgeModal: React.FC = () => {
  const { isPledgeModalOpen, closePledgeModal, submitEyePledge } = useDatabase();

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '1995-05-15',
    gender: 'Male',
    phone: '',
    email: '',
    city: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    consent: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedPledge, setCompletedPledge] = useState<EyePledgeRecord | null>(null);

  if (!isPledgeModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.nextOfKinName.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const record = await submitEyePledge(formData);
      setCompletedPledge(record);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 max-w-xl w-full overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6 relative">
          <button
            onClick={closePledgeModal}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 text-orange-200 text-xs uppercase font-bold tracking-wider mb-1">
            <Eye className="w-4 h-4" />
            <span>Sri Jayendra Saraswathi Eye Bank</span>
          </div>
          <h3 className="text-xl font-bold text-white">Pledge Your Eyes After Life</h3>
          <p className="text-orange-100 text-xs mt-1">
            One donor can give the priceless gift of sight to two blind individuals.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {completedPledge ? (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div>
                <span className="badge-trust mb-1 text-xs">Official Eye Donor Registration</span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  Card No: <span className="text-orange-600 font-mono">{completedPledge.pledgeId}</span>
                </h4>
              </div>

              {/* Printable Digital Card */}
              <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-white border-2 border-orange-300 rounded-2xl p-5 text-left text-xs shadow-md relative overflow-hidden max-w-md mx-auto">
                <div className="flex justify-between items-start border-b border-orange-200 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/assets/images/sankaraeye-colored-logo.png" 
                      alt="Logo" 
                      className="h-8 w-auto"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">EYE DONOR CARD</div>
                      <div className="text-[10px] text-orange-700 font-semibold">Sankara Eye Foundation India</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded font-bold">
                    {completedPledge.pledgeId}
                  </span>
                </div>

                <div className="space-y-1.5 text-slate-700">
                  <div>
                    <span className="text-slate-400 text-[10px] block">DONOR NAME</span>
                    <strong className="text-sm text-slate-900">{completedPledge.fullName}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 text-[10px] block">DATE OF BIRTH</span>
                      <span>{completedPledge.dob}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">CITY / STATE</span>
                      <span>{completedPledge.city || 'India'}</span>
                    </div>
                  </div>
                  <div className="border-t border-orange-200/80 pt-2 text-[11px]">
                    <span className="text-slate-400 text-[10px] block">NEXT OF KIN / INFORMANT</span>
                    <span className="font-semibold text-slate-800">{completedPledge.nextOfKinName} ({completedPledge.nextOfKinPhone})</span>
                  </div>
                </div>

                <div className="mt-4 bg-orange-600 text-white rounded-xl p-2 text-center">
                  <div className="text-[10px] font-medium uppercase tracking-wider">24/7 Eye Bank Emergency Lines</div>
                  <div className="font-bold text-xs tracking-wider">7619519555 / 080-69038900</div>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="btn-secondary text-xs !py-2.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Donor Card</span>
                </button>
                <button
                  onClick={closePledgeModal}
                  className="btn-primary !px-8 text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City / Town & State *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru, Karnataka"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="bg-orange-50/60 border border-orange-200/80 rounded-xl p-3 space-y-2">
                <div className="text-xs font-bold text-orange-900 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-orange-600" />
                  <span>Next of Kin / Family Contact (Crucial for Eye Donation)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Family Member / Kin Name *"
                    value={formData.nextOfKinName}
                    onChange={(e) => setFormData({ ...formData, nextOfKinName: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Kin Phone Number *"
                    value={formData.nextOfKinPhone}
                    onChange={(e) => setFormData({ ...formData, nextOfKinPhone: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 italic">
                  * As per Indian law, eye harvesting requires notification by family within 6 hours of demise.
                </p>
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 text-orange-600 focus:ring-orange-500 rounded"
                />
                <span>
                  I pledge my eyes upon my demise to restore sight to two blind individuals, and I have informed my family members of this decision.
                </span>
              </label>

              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Registered with National Eye Bank</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary !px-6 !py-2.5 text-xs font-bold"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering...' : 'Register My Eye Pledge →'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
