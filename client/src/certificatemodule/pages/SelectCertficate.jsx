import React from 'react';
import CertificateContent from './certificatetemplates/basic01';
import Template02 from './certificatetemplates/basic02';
import Template03 from './certificatetemplates/03_sarthak';
import Template04 from './certificatetemplates/basic04';
import Template05 from './certificatetemplates/basic05';
import Template06 from './certificatetemplates/basic06';
import Template07 from './certificatetemplates/basic07';
import Template08 from './certificatetemplates/basic08';
import Template09 from './certificatetemplates/basic09';
import Template10 from './certificatetemplates/premium01';
import Template11 from './certificatetemplates/premium02';
import Template12 from './certificatetemplates/premium03';
import Template13 from './certificatetemplates/premium04';
import Template14 from './certificatetemplates/basic10';
import Template15 from './certificatetemplates/premium05';
import Template16 from './certificatetemplates/premium06';

function SelectCertficate({
  title,
  templateId,
  eventId,
  contentBody,
  certiType,
  logos,
  participantDetail,
  signature,
  header,
  footer,
  verifiableLink
}) {
  const certiDesignTemp = [
    <CertificateContent
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'0'}
    />,
    <Template02
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'1'}
    />,
    <Template03
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'2'}
    />,
    <Template04
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'3'}
    />,
    <Template05
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'4'}
    />,
    <Template06
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'5'}
    />,
    <Template07
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'6'}
    />,
    <Template08
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'7'}
    />,

    <Template09
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'8'}
    />,
    <Template10
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'9'}
    />,
    <Template11
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'10'}
    />,
    <Template12
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'11'}
    />,
    <Template13
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'12'}
    />,
    <Template14
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'13'}
    />,
    <Template15
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'14'}
    />,
    <Template16
    title={title}
    verifiableLink={verifiableLink}
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'15'}
    />,
  ];

  return <div>{certiDesignTemp[templateId]}</div>;
}

export default SelectCertficate;
