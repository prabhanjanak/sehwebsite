export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById('razorpay-checkout-script');
    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface InitiateRazorpayPaymentParams {
  keyId: string;
  amount: number; // in INR rupees
  currency?: string;
  donorName: string;
  email: string;
  phone: string;
  description?: string;
  merchantName?: string;
  themeColor?: string;
  onSuccess: (paymentId: string) => void;
  onDismiss?: () => void;
  onError?: (error: any) => void;
}

export const initiateRazorpayPayment = async ({
  keyId,
  amount,
  currency = 'INR',
  donorName,
  email,
  phone,
  description = 'Gift of Vision — Sight-Restoring Surgery Donation (80G Tax Exempt)',
  merchantName = 'Sri Kanchi Kamakoti Medical Trust',
  themeColor = '#ea580c',
  onSuccess,
  onDismiss,
  onError
}: InitiateRazorpayPaymentParams) => {
  const loaded = await loadRazorpayScript();

  if (!loaded || !(window as any).Razorpay) {
    if (onError) onError(new Error('Razorpay SDK failed to load. Please check your internet connection.'));
    return;
  }

  const options = {
    key: keyId,
    amount: Math.round(amount * 100), // in paise
    currency,
    name: merchantName,
    description,
    image: 'https://sankaraeye.com/wp-content/themes/sankara/images/logo.png',
    prefill: {
      name: donorName,
      email: email || 'donor@sankaraeye.com',
      contact: phone || '9845012345'
    },
    notes: {
      trust_name: 'Sri Kanchi Kamakoti Medical Trust',
      tax_exemption: 'Section 80G Indian Income Tax Eligible',
      purpose: 'Gift of Vision Charitable Cataract Surgeries'
    },
    theme: {
      color: themeColor
    },
    handler: function (response: any) {
      if (response && response.razorpay_payment_id) {
        onSuccess(response.razorpay_payment_id);
      } else {
        onSuccess(`pay_test_${Date.now()}`);
      }
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) onDismiss();
      },
      escape: true,
      backdropclose: false
    }
  };

  try {
    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      if (onError) onError(response.error);
    });
    rzp.open();
  } catch (err) {
    if (onError) onError(err);
  }
};
