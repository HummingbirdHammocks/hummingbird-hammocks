import { Script } from 'gatsby';
import React from 'react';

export function UserWayWidget() {
  return (
    <Script
      type="text/javascript"
      src="https://cdn.userway.org/widget.js"
      id="userway_script"
      data-account="ukWAuGgTiM"
    />
  );
}
