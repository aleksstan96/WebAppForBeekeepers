CREATE DEFINER=`root`@`localhost` TRIGGER `je_ocenio_AFTER_INSERT` AFTER INSERT ON `je_ocenio` FOR EACH ROW BEGIN
 UPDATE  proizvodi SET ocena = (ocena*br_ocena + NEW.ocena)/(br_ocena+1) WHERE id = NEW.proizvod_id;
 UPDATE proizvodi SET br_ocena = br_ocena + 1  WHERE id = NEW.proizvod_id;
END


-----------------------------------------------------------------------------------------------------------------------------------

CREATE DEFINER=`root`@`localhost` TRIGGER `porudzbina_AFTER_INSERT` AFTER INSERT ON `porudzbina` FOR EACH ROW BEGIN
	update proizvod set kolicina = kolicina - NEW.kolicina where id=NEW.proizvod_id;
END

-----------------------------------------------------------------------------------------------------------------------------------

CREATE DEFINER=`root`@`localhost` TRIGGER `zahtev_AFTER_UPDATE` AFTER UPDATE ON `zahtev` FOR EACH ROW BEGIN
	IF OLD.prihvacen = 1 THEN
	IF OLD.role = 'Beekeeper' THEN
		insert into pcelar(ime, prezime, datum_rodjenja, adresa, telefon, email)
        values (OLD.ime, OLD.prezime, OLD.datum_rodjenja, OLD.adresa, OLD.telefon, OLD.email);
        INSERT INTO user(username, password, role, email) VALUES (OLD.username, OLD.PASSWORD,"Beekeeper",OLD.email);
    ELSEIF OLD.role='Customer' THEN
		insert into kupac(ime, prezime, datum_rodjenja, adresa, telefon, email)
        values (OLD.ime, OLD.prezime, OLD.datum_rodjenja, OLD.adresa, OLD.telefon, OLD.email);
        INSERT INTO user(username, password, role, email) VALUES (OLD.username, OLD.PASSWORD,"Customer",OLD.email);
    ELSEIF OLD.role='Admin' THEN
     INSERT INTO user(username, password, role, email) VALUES (OLD.username, OLD.PASSWORD,"Admin",OLD.email);
    END IF;
   
END IF;
END

--------------------------------------------------------------------------------------------------------------------------------------
CREATE DEFINER=`root`@`localhost` TRIGGER `user_AFTER_INSERT` AFTER INSERT ON `user` FOR EACH ROW BEGIN
	if NEW.role='Beekeeper' then
		update pcelar p set p.user_id = NEW.id where user_id IS NULL;
	elseif NEW.role='Customer' then
		update kupac k set k.user_id = NEW.id where user_id IS NULL;
    end if;
END