import { Script } from 'gatsby';
import React from 'react';

export function ChatWidget() {
  return (
    <Script
      type="text/javascript"
      src="https://quickchat.ai/user_kit/quickchat8vqb7j.js"
      id="quickchat_script"
      scenario_id="2njqzwbq1u"
    />
  );
}
