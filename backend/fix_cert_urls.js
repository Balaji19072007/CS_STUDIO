const { supabase } = require('./config/supabase');

async function run() {
  const { data: certificates, error } = await supabase.from('certificates').select('*');
  
  if (error) {
    console.error('Error fetching certificates:', error);
    return;
  }
  
  for (const cert of certificates) {
    if (cert.verification_url && cert.verification_url.includes('localhost:5000')) {
      const newUrl = cert.verification_url.replace('localhost:5000', 'localhost:5173');
      const { error: updateError } = await supabase
        .from('certificates')
        .update({ verification_url: newUrl })
        .eq('id', cert.id);
        
      if (updateError) {
        console.error('Failed to update cert:', cert.id, updateError);
      } else {
        console.log('Fixed certificate:', cert.id);
      }
    }
  }
  
  console.log('Done fixing URLs.');
}

run();
