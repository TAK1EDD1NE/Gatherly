// MetricsSection.js
import React from 'react';
import MetricComponent from './MetricComponent';

const MetricsSection = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <MetricComponent
        title="Total Employee"
        value={data.totalEmployee}
        percentage={data.employeeFemalePercentage}
      />
      <MetricComponent
        title="Total Salle"
        value={data.totalSalle}
        percentage={data.salleAvailablePercentage}
      />
      <MetricComponent
        title="Total Event"
        value={data.totalEvent}
        percentage={data.eventCompletedPercentage}
      />
      <MetricComponent
        title="Total Revenue"
        value={data.totalRevenue}
        percentage={data.revenueChangePercentage}
      />
    </div>
  );
};

export default MetricsSection;