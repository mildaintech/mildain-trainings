import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const zohoWebhookUrl = 'https://crm.zoho.in/crm/WebToLeadForm';
    
    const zohoData = new URLSearchParams();
    
    zohoData.append('xnQsjsdp', 'fcb1d827601d39b06554b14f0e8fafae834ebf846aebe80ee9f4d38d62df62d1');
    zohoData.append('zc_gad', '');
    zohoData.append('xmIwtLD', '87944c47588ecf00ddebde63f6ce4a9beff119ce627943b92f773c21624b999066b2825adb45dcf489dc04f36f9d541a');
    zohoData.append('actionType', 'TGVhZHM=');
    zohoData.append('returnURL', 'https://www.mildaintrainings.com');

    zohoData.append('Company', body.fullName); 
    zohoData.append('Last Name', body.fullName); 
    zohoData.append('Email', body.email);
    zohoData.append('Phone', body.phone); 
    zohoData.append('Description', body.message && body.message.trim() !== '' ? body.message : 'No message provided');
    zohoData.append('Address - Country / Region', 'Not Specified'); 

    const response = await fetch(zohoWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: zohoData.toString(),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}