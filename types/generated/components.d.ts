import type { Schema, Struct } from '@strapi/strapi';

export interface OverviewLabelValue extends Struct.ComponentSchema {
  collectionName: 'components_overview_label_values';
  info: {
    displayName: 'Label Value';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface OverviewPricingItem extends Struct.ComponentSchema {
  collectionName: 'components_overview_pricing_items';
  info: {
    displayName: 'Pricing Item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface OverviewPricingTier extends Struct.ComponentSchema {
  collectionName: 'components_overview_pricing_tiers';
  info: {
    displayName: 'Pricing Tier';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'overview.pricing-item', true>;
  };
}

export interface OverviewSupplier extends Struct.ComponentSchema {
  collectionName: 'components_overview_suppliers';
  info: {
    displayName: 'Supplier';
  };
  attributes: {
    linkHref: Schema.Attribute.String;
    linkText: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'overview.label-value': OverviewLabelValue;
      'overview.pricing-item': OverviewPricingItem;
      'overview.pricing-tier': OverviewPricingTier;
      'overview.supplier': OverviewSupplier;
    }
  }
}
