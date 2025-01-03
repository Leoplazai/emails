import React, { useState } from 'react';

const EmailGenerator = () => {
  const [formData, setFormData] = useState({
    // Email Settings
    useGreeting: false,
    followUpCount: '0',
    lineReduction: '1',
    maxLines: '7',
    professionalismLevel: '5',
    
    // Core Fields
    ageRange: '',
    location: '',
    industry: '',
    productService: '',
    valueProposition: '',
    painPoints: '',
    marketAlternatives: '',
    successMetrics: '',
    phoneNumber: '',
    sampleEmail: ''
  });

  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [generatedFollowUps, setGeneratedFollowUps] = useState([]);
  const [showOutput, setShowOutput] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(`${name} changed to:`, value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const generateEmailContent = (data) => {
    const profLevel = parseInt(data.professionalismLevel);
    const maxLines = parseInt(data.maxLines);
    
    // Adjust tone based on professionalism level
    const tone = {
      hook: profLevel > 7 ? 'Are you experiencing' : 'Hate dealing with',
      impact: profLevel > 7 ? 'significantly impacts' : 'costs you',
      cta: profLevel > 7 ? 'Would you like to discuss' : 'Ready for'
    };

    const lines = [
      // Opening with emotional trigger
      `${data.useGreeting ? 'Hi {{firstName}},\n\n' : ''}${tone.hook} ${data.painPoints} in your ${data.industry}?`,
      
      // Cost implication
      `Every delay ${tone.impact} $1,000+ in lost productivity`,
      
      // Value proposition
      `Imagine achieving ${data.valueProposition} without compromises`,
      
      // Social proof
      `Leading ${data.industry} companies in ${data.location} trust us with their critical projects`,
      
      // Success metrics
      `${data.successMetrics}`,
      
      // Risk reversal
      `Your reputation is too valuable to risk with unreliable services`,
      
      // Call to action
      `${tone.cta} a 5-minute chat? Call ${data.phoneNumber} (available now)`
    ];

    return {
      subject: `Save $1,000s on ${data.industry} Projects - ${data.valueProposition}`,
      body: lines.slice(0, maxLines).join('\n\n')
    };
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Generating email with:", formData);
    
    // Generate main email using framework
    const mainEmail = generateEmailContent(formData);
    setGeneratedEmail(mainEmail);
    setShowOutput(true);

    // Generate follow-ups if requested
    if (parseInt(formData.followUpCount) > 0) {
      const followUps = [];
      const lineReduction = parseInt(formData.lineReduction);
      const maxLines = parseInt(formData.maxLines);

      for (let i = 0; i < parseInt(formData.followUpCount); i++) {
        // Adjust lines for each follow-up
        const reducedLines = maxLines - (lineReduction * (i + 1));
        const data = {...formData, maxLines: reducedLines};
        
        const followUpEmail = {
          subject: `Follow-up: ${data.valueProposition} for ${data.industry}`,
          body: `${data.useGreeting ? 'Hi {{firstName}},\n\n' : ''}Still struggling with ${data.painPoints}?

Leading companies saved $1,000s last month alone.

Call us at ${data.phoneNumber} for a quick 5-minute chat.`,
          timing: `${(i + 1) * 3} days after initial email`
        };
        followUps.push(followUpEmail);
      }
      setGeneratedFollowUps(followUps);
    }
  };

  // Styles
  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const sectionStyle = {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <form>
        {/* Email Settings Section */}
        <div style={sectionStyle}>
          <h2 style={{ marginBottom: '20px' }}>Email Settings</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="useGreeting"
                checked={formData.useGreeting}
                onChange={handleCheckboxChange}
                style={{ marginRight: '10px' }}
              />
              Use "Hi {'{firstName}'}" Greeting
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Follow-up Emails</label>
            <select
              name="followUpCount"
              value={formData.followUpCount}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="0">No follow-ups</option>
              <option value="2">2 follow-ups</option>
              <option value="3">3 follow-ups</option>
              <option value="4">4 follow-ups</option>
              <option value="5">5 follow-ups</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Line Reduction per Follow-up</label>
            <select
              name="lineReduction"
              value={formData.lineReduction}
              onChange={handleChange}
              style={inputStyle}
            >
              {[1,2,3].map(num => (
                <option key={num} value={num}>{num} line(s)</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Maximum Lines per Email</label>
            <select
              name="maxLines"
              value={formData.maxLines}
              onChange={handleChange}
              style={inputStyle}
            >
              {[4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num} lines</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Professionalism Level</label>
            <input
              type="range"
              min="1"
              max="10"
              name="professionalismLevel"
              value={formData.professionalismLevel}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Casual</span>
              <span>Professional</span>
            </div>
          </div>
        </div>

        {/* Core Information Section */}
        <div style={sectionStyle}>
          <h2 style={{ marginBottom: '20px' }}>Core Information</h2>

          {[
            ['ageRange', 'Target Audience Age Range'],
            ['location', 'Geographic Location'],
            ['industry', 'Industry'],
            ['productService', 'Product/Service'],
            ['valueProposition', 'Unique Value Proposition'],
            ['painPoints', 'Key Pain Points'],
            ['successMetrics', 'Success Metrics/Social Proof'],
            ['phoneNumber', 'Phone Number/CTA']
          ].map(([name, label]) => (
            <div key={name} style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>{label} *</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          ))}

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Current Market Alternatives</label>
            <input
              type="text"
              name="marketAlternatives"
              value={formData.marketAlternatives}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Sample Email (Optional)</label>
            <textarea
              name="sampleEmail"
              value={formData.sampleEmail}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px' }}
            />
          </div>
        </div>

        <button 
          onClick={handleClick}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '20px'
          }}
        >
          Generate Email Sequence
        </button>
      </form>

      {/* Output Section */}
      {showOutput && generatedEmail && (
        <div style={sectionStyle}>
          <h2 style={{ marginBottom: '10px' }}>Generated Email:</h2>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Subject: {generatedEmail.subject}
          </div>
          <pre style={{ 
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            backgroundColor: '#f9f9f9',
            padding: '10px',
            borderRadius: '4px'
          }}>
            {generatedEmail.body}
          </pre>
        </div>
      )}

      {showOutput && generatedFollowUps.map((email, index) => (
        <div key={index} style={sectionStyle}>
          <h2 style={{ marginBottom: '10px' }}>Follow-up Email {index + 1}</h2>
          <div style={{ color: '#666', marginBottom: '10px' }}>
            Timing: {email.timing}
          </div>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Subject: {email.subject}
          </div>
          <pre style={{ 
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            backgroundColor: '#f9f9f9',
            padding: '10px',
            borderRadius: '4px'
          }}>
            {email.body}
          </pre>
        </div>
      ))}
    </div>
  );
};

export default EmailGenerator;
