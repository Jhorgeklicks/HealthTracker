
export const WelcomeTemplate = (name, password, status, link = process.env.NEXT_PUBLIC_VERCEL_URL ) => {

  let data = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:620px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.row-1 .column-1 .block-2.paragraph_block td.pad>div {
				text-align: justify !important;
				font-size: 14px !important;
			}

			.row-1 .column-1 .block-1.heading_block h1 {
				font-size: 22px !important;
			}

			.row-1 .column-1 .block-4.paragraph_block td.pad>div {
				text-align: left !important;
				font-size: 14px !important;
			}

			.row-1 .column-1 .block-5.paragraph_block td.pad>div {
				text-align: center !important;
			}

			.row-1 .column-1 .block-5.paragraph_block td.pad {
				padding: 5px !important;
			}

			.row-1 .column-1 .block-7.paragraph_block td.pad>div {
				text-align: center !important;
				font-size: 14px !important;
			}
		}
	</style>
</head>

<body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f2f2f2; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: direction: ltr; font-family: 'Bitter', Georgia, Times, 'Times New Roman', serif; font-size: 25px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder">Dear Sir/Madam<br></span></h1>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
																	<p style="margin: 0;">${
                                    status === "new"
                                      ? "This email confirms the creation of your account on the Health Tracker platform. You can now access the platform using the following credentials:"
                                      : "This email confirms that your Health Tracker login information has been updated, following your recent request."
                                  }</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="divider_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
																	<p style="margin: 0; margin-bottom: 16px;"><strong>username </strong>: ${name}</p>
																	<p style="margin: 0;"><strong>password </strong>: ${password}</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-5" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#f00;direction:ltr;font-family:'Nunito', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:justify;mso-line-height-alt:14.399999999999999px;">
																	<p style="margin: 0;">Password cannot be updated so please keep it safe</p>
																</div>
															</td>
														</tr>
													</table>

													<table class="divider_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>

												<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="button_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																<a href="${link}" target="_blank" style="cursor:pointer;text-decoration:none;display:inline-block;color:#ffffff;background-color:#00d084;border-radius:4px;width:auto;border-top:1px solid transparent;font-weight:400;border-right:1px solid transparent;border-bottom:1px solid transparent;border-left:1px solid transparent;padding:10px 15px;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:15px;text-align:center;word-break:keep-all">Visit Dashboard</a>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>

									<table class="m_-6654459198754484166paragraph_block m_-6654459198754484166block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="word-break:break-word">
														<tbody><tr>
															<td class="m_-6654459198754484166pad">
																<div style="color:#101112;direction:ltr;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left">
																	<p style="margin:0">If the button doesn't work. please copy the link below and paste in your browser</br></br>
																	<kbd>${link}</kbd>
																	</p>
																</div>
															</td>
														</tr>
													</tbody></table>


													<table class="divider_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>

													<table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:justify;mso-line-height-alt:19.2px;">
																	<p style="margin: 0; margin-bottom: 16px;">Should you have any questions, please don't hesitate to contact our support team at <a href="mailto:klicksnet@gmail.com?subject=Help On HealthTracker App" target="_blank" title="klicksnet@gmail.com" style="text-decoration: none; color: #00d084;" rel="noopener">KlicksTech</a>.</p>
																	<p style="margin: 10px 0 20 0;"><em>Welcome to Health Tracker!</em></p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
</body>

</html>`;

  return data;
};
