using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace rentalCarAPI.classes
{
    public static class EncodingBase64
    {
        public static string EncodeBase64(this System.Text.Encoding encoding, string text)
        {
            if (text == null)
            {
                return null;
            }

            byte[] textAsBytes = encoding.GetBytes(text);
            return System.Convert.ToBase64String(textAsBytes);
        }

    }
}