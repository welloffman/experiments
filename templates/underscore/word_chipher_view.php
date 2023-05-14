<div>Шифрование</div>
<div class="js-encript-block" style="display: flex;">
	<div>
		<textarea class="js-original-message" rows="10" cols="100"><%- encryptString1 %></textarea>
	</div>

	<div class="js-encrypted-message" style="width: 800px; height: 156px; border: 1px solid black; margin-left: 20px; box-sizing: border-box;"><%- decryptString1 %></div>
</div>
<div>
	<input type="button" class="btn js-encrypt" value="Зашифровать">
</div>

<hr style="margin-top: 20px;">

<div>Расшифровка</div>
<div class="js-decrypt-block" style="display: flex;">
	<div>
		<textarea class="js-encrypted-message" rows="10" cols="100"><%- decryptString2 %></textarea>
	</div>
	<div class="js-original-message" style="width: 800px; height: 156px; border: 1px solid black; margin-left: 20px; box-sizing: border-box;"><%- encryptString2 %></div>
</div>
<div>
	<input type="button" class="btn js-decrypt" value="Расшифровать">
</div>