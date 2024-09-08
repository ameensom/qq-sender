import mongoose from 'mongoose';
const { Schema } = mongoose;

const whatsappNotificationsSchema = new Schema({
  object: { type: String },
  entry: [{
    id: { type: String },
    changes: [{
      value: {
        messaging_product: { type: String },
        metadata: {
          display_phone_number: { type: String },
          phone_number_id: { type: String }
        },
        contacts: [{
          profile: {
            name: { type: String }
          },
          wa_id: { type: String }
        }],
        messages: [
          {
            from: { type: String },
            id: { type: String },
            timestamp: { type: Date },
            referral: {
              source_url: { type: String },
              source_id: { type: String },
              source_type: { type: String },
              headline: { type: String },
              body: { type: String },
              media_type: { type: String },
              image_url: { type: String },
              video_url: { type: String },
              thumbnail_url: { type: String }
            },
            type: { type: String },
            text: {
              body: { type: String }
            },
            context: {
              from: { type: String },
              id: { type: String },
              referred_product: {
                catalog_id: { type: String },
                product_retailer_id: { type: String }
              }
            },
            button: {
              text: { type: String },
              payload: { type: String }
            },
            contacts: [{
              addresses: [{
                city: { type: String },
                country: { type: String },
                country_code: { type: String },
                state: { type: String },
                street: { type: String },
                type: { type: String },
                zip: { type: String }
              }],
              birthday: { type: String },
              emails: [{
                email: { type: String },
                type: { type: String }
              }],
              name: {
                formatted_name: { type: String },
                first_name: { type: String },
                last_name: { type: String },
                middle_name: { type: String },
                suffix: { type: String },
                prefix: { type: String }
              },
              org: {
                company: { type: String },
                department: { type: String },
                title: { type: String }
              },
              phones: [{
                phone: { type: String },
                wa_id: { type: String },
                type: { type: String }
              }],
              urls: [{
                url: { type: String },
                type: { type: String }
              }]
            }],
            location: {
              latitude: { type: String },
              longitude: { type: String },
              name: { type: String },
              address: { type: String }
            },
            sticker: {
              mime_type: { type: String },
              sha256: { type: String },
              id: { type: String }
            },
            image: {
              caption: { type: String },
              mime_type: { type: String },
              sha256: { type: String },
              id: { type: String }
            },
            interactive: {
              button_reply: {
                id: { type: String },
                title: { type: String }
              },
              list_reply: {
                id: { type: String },
                title: { type: String },
                description: { type: String }
              },
              type: { type: String },
              nfm_reply: {
                name: { type: String },
                response_json: { type: Schema.Types.Mixed }
              }
            },
            order: {
              catalog_id: { type: String },
              product_items: [{
                product_retailer_id: { type: String },
                quantity: { type: String },
                item_price: { type: String },
                currency: { type: String }
              }]
            }

          }],
        statuses: [
          {
            id: { type: String },
            recipient_id: { type: String },
            status: { type: String },
            timestamp: { type: String },
            conversation: {
              id: { type: String },
              expiration_timestamp: { type: Date },
              origin: {
                type: { type: String }
              }
            },
            pricing: {
              pricing_model: { type: String },
              billable: { type: Boolean },
              category: { type: String }
            }
          }]
      },
      field: { type: String }
    }]
  }],
  media: {
    mimeType: { type: String },
    size: { type: String },
    sha256: { type: String },
    url: { type: String },
    mediaType: { type: String }
  },
  shouldAwaitVINResponse: { type: Boolean },
  conversationId: { type: Schema.Types.ObjectId, ref: 'WhatsappConversation' },
  phone: { type: String },
  message: { type: String }
}, { timestamps: true });

export default mongoose.model('WhatsappNotification', whatsappNotificationsSchema);