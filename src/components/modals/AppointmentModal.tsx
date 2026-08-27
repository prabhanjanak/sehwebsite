import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Activity, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { HOSPITALS_DATA } from '../../data/hospitalsData';
import { SPECIALTIES_DATA } from '../../data/specialtiesData';
import { AppointmentRecord } from '../../types';

export const AppointmentModal: React.FC = () => {
  const { 
    isAppointmentModalOpen, 
    closeAppointmentModal, 
    modalDefaultLocation, 
    modalDefaultSpecialty,
    bookAppointment 
  } = useDatabase();

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    hospitalLocation: '',
    clinicalSpecialty: '',
    preferredDate: '',
    preferredSlot: 'Morning (9:00 AM - 1:00 PM)',
    patientType: 'New' as 'New' | 'Follow-up',
    symptoms: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isAppointmentModalOpen) {
      setConfirmedBooking(null);
      setErrorMessage('');
      setFormData(prev => ({
        ...prev,
        hospitalLocation: modalDefaultLocation || HOSPITALS_DATA[0].city,
        clinicalSpecialty: modalDefaultSpecialty || SPECIALTIES_DATA[0].title,
        preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
      }));
    }
  }, [isAppointmentModalOpen, modalDefaultLocation, modalDefaultSpecialty]);

  if (!isAppointmentModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Phone validation
    const phoneRegex = /^[0-9+ -]{8,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage('Please enter a valid contact phone number.');
      return;
    }

    if (!formData.patientName.trim()) {
      setErrorMessage('Please provide the patient name.');
      return;
    }

    setIsSubmitting(true);
    try {
      const record = await bookAppointment(formData);
      setConfirmedBooking(record);
    } catch (err) {
      setErrorMessage('An unexpected error occurred while booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 max-w-xl w-full overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6 relative">
          <button
            onClick={closeAppointmentModal}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 text-orange-200 text-xs uppercase font-bold tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Priority Consultation & OPD Booking</span>
          </div>
          <h3 className="text-xl font-bold text-white">Book an Appointment at Sankara</h3>
          <p className="text-orange-100 text-xs mt-1">
            Directly scheduled with our super-specialty ophthalmologists across 14 hospital units.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmedBooking ? (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="badge-sankara mb-2 text-xs">Priority Booking Confirmed</span>
                <h4 className="text-2xl font-bold text-slate-900 mt-1">
                  Reference: <span className="text-orange-600 font-mono">{confirmedBooking.bookingRef}</span>
                </h4>
                <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-800">{confirmedBooking.patientName}</strong>. Your consultation has been scheduled at <strong>Sankara Eye Hospital, {confirmedBooking.hospitalLocation}</strong> for <strong>{confirmedBooking.clinicalSpecialty}</strong>.
                </p>
              </div>

              <div className="bg-orange-50/70 border border-orange-200/70 rounded-xl p-4 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Date:</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Slot:</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.preferredSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-semibold text-slate-800">{confirmedBooking.phone}</span>
                </div>
                <div className="flex justify-between border-t border-orange-200 pt-1.5 mt-1.5">
                  <span className="text-slate-500">Hospital Emergency Hotline:</span>
                  <span className="font-bold text-orange-700">080-69038900</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={closeAppointmentModal}
                  className="btn-primary !px-8 text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Patient Type */}
              <div className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                <span className="font-semibold text-slate-700">Patient Type:</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="patientType"
                    checked={formData.patientType === 'New'}
                    onChange={() => setFormData({ ...formData, patientType: 'New' })}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span>New Patient</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="patientType"
                    checked={formData.patientType === 'Follow-up'}
                    onChange={() => setFormData({ ...formData, patientType: 'Follow-up' })}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span>Follow-up Visit</span>
                </label>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (10 digits) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9845012345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Hospital Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Hospital Location *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={formData.hospitalLocation}
                      onChange={(e) => setFormData({ ...formData, hospitalLocation: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    >
                      {HOSPITALS_DATA.map((hosp) => (
                        <option key={hosp.id} value={hosp.city}>
                          {hosp.city} ({hosp.state})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Specialty & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinical Specialty *
                  </label>
                  <select
                    value={formData.clinicalSpecialty}
                    onChange={(e) => setFormData({ ...formData, clinicalSpecialty: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                  >
                    {SPECIALTIES_DATA.map((spec) => (
                      <option key={spec.id} value={spec.title}>
                        {spec.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Slot */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Morning (9AM - 1PM)', 'Afternoon (2PM - 5PM)', 'Evening (5PM - 7:30PM)'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, preferredSlot: slot })}
                      className={`py-2 px-2 rounded-lg border text-center font-medium transition-all ${
                        formData.preferredSlot === slot
                          ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {slot.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medical Symptoms Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Medical Symptoms / Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe any vision difficulties, eye pain, redness, or duration of symptoms..."
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Confidential Medical Record</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary !px-6 !py-2.5 text-xs font-bold"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Appointment →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
