import React from 'react';

export function PageLoader() {
  return (
    <div className="overlay">
      <div className="page-loader"></div>
    </div>
  )
}

export function SectionLoader() {
  return (
    <div className="section-overlay">
      <div className="section-loader icon-loader"></div>
      <div className="section-loader text-loader"></div>
      <div className="section-loader text-loader"></div>
    </div>
  )
}
