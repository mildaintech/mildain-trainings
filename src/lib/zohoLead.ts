export interface ZohoLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  message?: string;
  inquiryType?: string;
  source?: string;
}

export async function pushLeadToZoho(body: ZohoLeadPayload): Promise<boolean> {
  try {
    const zohoWebhookUrl = 'https://crm.zoho.in/crm/WebToLeadForm';
    const zohoData = new URLSearchParams();

    zohoData.append('xnQsjsdp', 'fcb1d827601d39b06554b14f0e8fafae834ebf846aebe80ee9f4d38d62df62d1');
    zohoData.append('zc_gad', '');
    zohoData.append(
      'xmIwtLD',
      '87944c47588ecf00ddebde63f6ce4a9beff119ce627943b92f773c21624b999066b2825adb45dcf489dc04f36f9d541a'
    );
    zohoData.append('actionType', 'TGVhZHM=');
    zohoData.append('returnURL', 'https://www.mildaintrainings.com');

    zohoData.append('Company', body.fullName);
    zohoData.append('Last Name', body.fullName);
    zohoData.append('Email', body.email);
    zohoData.append('Phone', body.phone);

    const metaDetails = [
      body.inquiryType ? `Type: ${body.inquiryType}` : '',
      body.source ? `Source: ${body.source}` : '',
      body.message && body.message.trim() !== '' ? `Message: ${body.message.trim()}` : 'No message provided',
    ]
      .filter(Boolean)
      .join(' | ');

    zohoData.append('Description', metaDetails);
    zohoData.append('Address - Country / Region', body.country || 'Not Specified');

    const response = await fetch(zohoWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: zohoData.toString(),
    });

    return response.ok;
  } catch {
    return false;
  }
}